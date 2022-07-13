const mongo = require('../../connection.js').getDb();

const employees = mongo.collection("tbl_employees");
const users = mongo.collection("tbl_auths");
const leads = mongo.collection("tbl_leads");
const roles = mongo.collection("tbl_roles");

var ObjectId = require('mongodb').ObjectID;

exports.get_userdata = (req, res) => {

    if(req.body.loginType === "admin"){

        users.aggregate([
            { $match: {_id: new ObjectId(req.body.user_id) }},
            { $lookup: {
                from:'tbl_roles',
                localField: "role",
                foreignField: "id",
                as: "role_data"                                                                  
            }},
        ]).toArray((error, result) => {

            if (error) {
                return res.status(202).json({ message: error });
            }

            if (result[0]) {

                var user = result[0];
                user["uploads_folder"] = "/vms/"
                return res.status(200).json({
                    user: user,
                });
                    
            } else {
                return res.status(202).json({
                    message: error
                });
            }
        })
    }else{

        employees.aggregate([
            { $match: {_id: new ObjectId(req.body.user_id) }},
            { $lookup: {
                from:'tbl_roles',
                localField: "role",
                foreignField: "id",
                as: "role_data"                                                                  
            }},
        ]).toArray((error, result) => {

            if (error) {
                return res.status(202).json({ message: error });
            }

            if (result[0]) {

                var user = result[0];
                return res.status(200).json({
                    user: {"_id":user._id,"admin_name":user.employee_name,"email":user.office_email,"mobile":user.mobile_number,"user_image":user.user_image,"role_data":user.role_data,"role":user.role,"uploads_folder":"/vms/"},
                });
                    
            } else {
                return res.status(202).json({
                    message: error
                });
            }
        })

    }    
}

exports.get_roles = (req, res) => {

    roles.find({id:{$ne:1}})
        .toArray((error, result) => {

            if (error) {
                return res.status(202).json({ message: error });
            }

            if (result.length > 0) {

                return res.status(200).json({
                    roles: result,
                });
                    
            } else {
                return res.status(202).json({
                    message: "Error Occured."
                });
            }
        })
}

exports.get_teamleads = (req, res) => {

    users.find({ "created_by": req.body.user_id, "role": 4 })
        .toArray((error, result) => {

            if (error) {
                return res.status(202).json({ message: error });
            }

            if (result) {

                return res.status(200).json({
                    team_leads: result,
                });
                    
            } else {
                return res.status(202).json({
                    message: error
                });
            }
        })
}

exports.get_tlemployees = (req, res) => {
    
    employees.find({ "team_lead": req.body.user_id })
        .toArray((error, result) => {

            if (error) {
                return res.status(202).json({ message: error });
            }

            if (result) {

                return res.status(200).json({
                    employees: result,
                });
                    
            } else {
                return res.status(202).json({
                    message: error
                });
            }
        })
}

exports.get_dashboarddata = (req, res) => {

    const role = req.body.role;
    const user_id = req.body.user_id;

    var empquery = {};
    var tlquery = {};
    var activequery = {};
    var exitquery = {};
    if(role == 4){
        empquery["team_lead"] = user_id;
        activequery["status"] = { "$exists": true, "$in": [1] };
        activequery["team_lead"] = user_id;
        exitquery["status"] = { "$exists": true, "$in": [0] };
        exitquery["team_lead"] = user_id;
    }else if(role == 3){
        // empquery["team_lead"] = user_id;
        activequery["status"] = { "$exists": true, "$in": [1] };
        activequery["accounts_manager"] = user_id;
        exitquery["status"] = { "$exists": true, "$in": [0] };
        exitquery["accounts_manager"] = user_id;
        tlquery["role"] = { "$exists": true, "$in": [4] }
        tlquery["created_by"] = user_id
    }else if(role == 1){
        tlquery["role"] = { "$exists": true, "$in": [4] }
    }
    
    users.aggregate([
        { "$facet": {
          "AMCount": [
            { "$match" : { "role": { "$exists": true, "$in": [3] }}},
            { "$count": "AMCount" },
          ],
          "TLCount": [
            { "$match" : tlquery},
            { "$count": "TLCount" },
          ]
        }},
        { "$project": {
          "accounts_managers_count": { "$arrayElemAt": ["$AMCount.AMCount", 0] },
          "team_leads_count": { "$arrayElemAt": ["$TLCount.TLCount", 0] },
        }}
      ]).toArray((error, result) => {

        if (error) {
            return res.status(202).json({ message: error });
        }

        if (result) {

            employees.find(empquery).count(function(err,count){

                leads.aggregate([
                    { "$facet": {
                      "ACount": [
                        { "$match" : activequery},
                        { "$count": "ACount" },
                      ],
                      "ECount": [
                        { "$match" : exitquery},
                        { "$count": "ECount" }
                      ]
                    }},
                    { "$project": {
                      "ACount": { "$arrayElemAt": ["$ACount.ACount", 0] },
                      "ECount": { "$arrayElemAt": ["$ECount.ECount", 0] }
                    }}
                  ]).toArray(function(err,lcount){

                    result[0]["employees_count"] = count;
                    result[0]["active_leads_count"] = lcount[0]["ACount"];
                    result[0]["exit_leads_count"] = lcount[0]["ECount"];

                    return res.status(200).json({
                        dashboard_data: result,
                    });

                });

            })
                
        } else {
            return res.status(202).json({
                message: error
            });
        }
    })
}


