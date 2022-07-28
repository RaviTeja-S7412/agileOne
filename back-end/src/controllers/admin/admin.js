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

    roles.find({id:{$nin:[1,5]}})
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
    var offerquery = {};
    if(role == 5){
        // empquery["team_lead"] = user_id;
        offerquery["status"] = { "$exists": true, "$in": [2] };
        offerquery["employee_id"] = user_id;
        activequery["status"] = { "$exists": true, "$in": [1] };
        activequery["employee_id"] = user_id;
        exitquery["status"] = { "$exists": true, "$in": [0] };
        exitquery["employee_id"] = user_id;
    }else if(role == 4){
        empquery["team_lead"] = user_id;
        offerquery["status"] = { "$exists": true, "$in": [2] };
        offerquery["team_lead"] = user_id;
        activequery["status"] = { "$exists": true, "$in": [1] };
        activequery["team_lead"] = user_id;
        exitquery["status"] = { "$exists": true, "$in": [0] };
        exitquery["team_lead"] = user_id;
    }else if(role == 3){
        // empquery["team_lead"] = user_id;
        offerquery["status"] = { "$exists": true, "$in": [2] };
        offerquery["accounts_manager"] = user_id;
        activequery["status"] = { "$exists": true, "$in": [1] };
        activequery["accounts_manager"] = user_id;
        exitquery["status"] = { "$exists": true, "$in": [0] };
        exitquery["accounts_manager"] = user_id;
        tlquery["role"] = { "$exists": true, "$in": [4] }
        tlquery["created_by"] = user_id
    }else if(role == 2){
        // empquery["team_lead"] = user_id;
        offerquery["status"] = { "$exists": true, "$in": [2] };
        activequery["status"] = { "$exists": true, "$in": [1] };
        exitquery["status"] = { "$exists": true, "$in": [0] };
    }else if(role == 1){
        offerquery["status"] = { "$exists": true, "$in": [2] };
        activequery["status"] = { "$exists": true, "$in": [1] };
        exitquery["status"] = { "$exists": true, "$in": [0] };
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
                      "OCount": [
                        { "$match" : offerquery},
                        { "$count": "OCount" },
                      ],
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
                      "OCount": { "$arrayElemAt": ["$OCount.OCount", 0] },
                      "ACount": { "$arrayElemAt": ["$ACount.ACount", 0] },
                      "ECount": { "$arrayElemAt": ["$ECount.ECount", 0] }
                    }}
                  ]).toArray(function(err,lcount){

                    result[0]["employees_count"] = count;
                    result[0]["offer_leads_count"] = lcount[0]["OCount"];
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

exports.get_chartdata = (req, res) => {

    const role = req.body.role;
    const user_id = req.body.user_id;
    const sdate = new Date(req.body.sdate + 'T00:00:00.000Z');
    const edate = new Date(req.body.edate + 'T23:59:59.999Z');

    var oquery = {};
    var aquery = {};
    var equery = {};
    oquery["status"] = { "$exists": true, "$in": [2] };
    aquery["status"] = { "$exists": true, "$in": [1] };
    equery["status"] = { "$exists": true, "$in": [0] };
    oquery["created_date"] = {"$gte": sdate,"$lte": edate};
    aquery["created_date"] = {"$gte": sdate,"$lte": edate};
    equery["created_date"] = {"$gte": sdate,"$lte": edate};
    if(role == 5){
        oquery["employee_id"] = user_id;
        aquery["employee_id"] = user_id;
        equery["employee_id"] = user_id;
    }else if(role == 4){
        oquery["team_lead"] = user_id;
        aquery["team_lead"] = user_id;
        equery["team_lead"] = user_id;
    }else if(role == 3){
        oquery["accounts_manager"] = user_id;
        aquery["accounts_manager"] = user_id;
        equery["accounts_manager"] = user_id;
    }

    console.log(aquery);
    leads.aggregate([
        { "$facet": {
            "oCount": [
                { "$sort": { 'created_date' : 1 } },
                { "$match" : oquery},
                { $group: {
                    _id: {month: {$month: "$created_date"}},
                    count: { $sum: 1}
                }}
            ],
            "aCount": [
                { "$sort": { 'created_date' : 1 } },
                { "$match" : aquery},
                { $group: {
                    _id: {month: {$month: "$created_date"}},
                    count: { $sum: 1}
                }}
            ], 
            "eCount": [
                { "$sort": { 'created_date' : 1 } },
                { "$match" : equery},
                { $group: {
                    _id: {month: {$month: "$created_date"}},
                    count: { $sum: 1}
                }}
            ],  
        }}
      ]).toArray((error, result) => {

        if (error) {
            return res.status(202).json({ message: error });
        }

        if (result) {

            var odata = [];
            var adata = [];
            var edata = [];
            var docount = 0;
            var dacount = 0;
            var decount = 0;
            var oCount = result[0]['oCount'];
            var aCount = result[0]['aCount'];
            var eCount = result[0]['eCount'];

            var months = [{1:"Jan"},{2:"Feb"},{3:"Mar"},{4:"Apr"},{5:"May"},{6:"June"},{7:"July"},{8:"Aug"},{9:"Sep"},{10:"Oct"},{11:"Nov"},{12:"Dec"}];

            months.forEach((om, okey) => {
                var ostatus = false;
                oCount.forEach((oc) => {
                    if(om[oc._id.month]){
                        odata.push(oc.count);
                        docount += oc.count;
                        ostatus = true;
                    }
                })
                if(!ostatus)
                odata.push(0);

                var astatus = false;
                aCount.forEach((ac) => {
                    if(om[ac._id.month]){
                        adata.push(ac.count);
                        dacount += ac.count;
                        astatus = true;
                    }
                })
                if(!astatus)
                adata.push(0);

                var estatus = false;
                eCount.forEach((ec) => {
                    if(om[ec._id.month]){
                        edata.push(ec.count);
                        decount += ec.count;
                        estatus = true;
                    }
                })
                if(!estatus)
                edata.push(0);
            })
            return res.status(200).json({
                chart_data: {
                    "bar_offer_count": odata,
                    "bar_active_count": adata,
                    "bar_exit_count": edata,
                    "doughnut_chart_count": [docount,dacount,decount],
                }
            });

        } else {
            return res.status(202).json({
                message: error
            });
        }
    })
}


