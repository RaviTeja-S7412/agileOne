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
    
    leads.aggregate([
        { "$facet": {
            "oCount": [
                { "$sort": { 'created_date' : 1 } },
                { "$match" : { "status": { "$exists": true, "$in": [2] }}},
                { $group: {
                    _id: {month: {$month: "$created_date"}},
                    count: { $sum: 1}
                }}
            ],
            "aCount": [
                { "$sort": { 'created_date' : 1 } },
                { "$match" : { "status": { "$exists": true, "$in": [1] }}},
                { $group: {
                    _id: {month: {$month: "$created_date"}},
                    count: { $sum: 1}
                }}
            ], 
            "eCount": [
                { "$sort": { 'created_date' : 1 } },
                { "$match" : { "status": { "$exists": true, "$in": [0] }}},
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
            var fdata = [];
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
                        odata.push({"month":oc._id.month,"count":oc.count,"month_name":months[oc._id.month-1][oc._id.month]});
                        docount += oc.count;
                        ostatus = true;
                    }
                })
                if(!ostatus)
                odata.push({"month":okey+1,"count":0,"month_name":months[okey][okey+1]});

                var astatus = false;
                aCount.forEach((ac) => {
                    if(om[ac._id.month]){
                        adata.push({"month":ac._id.month,"count":ac.count,"month_name":months[ac._id.month-1][ac._id.month]});
                        dacount += ac.count;
                        astatus = true;
                    }
                })
                if(!astatus)
                adata.push({"month":okey+1,"count":0,"month_name":months[okey][okey+1]});

                var estatus = false;
                eCount.forEach((ec) => {
                    if(om[ec._id.month]){
                        edata.push({"month":ec._id.month,"count":ec.count,"month_name":months[ec._id.month-1][ec._id.month]});
                        decount += ec.count;
                        estatus = true;
                    }
                })
                if(!estatus)
                edata.push({"month":okey+1,"count":0,"month_name":months[okey][okey+1]});
            })

            /* odata.forEach((val, fkey) => {
                fdata.push({
                    "month": val.month,
                    "month_name": val.month_name,
                    "offer_count": val.count,
                    "active_count": adata[fkey]["count"],
                    "exit_count": edata[fkey]["count"]
                });
            }) */

            return res.status(200).json({
                chart_data: {
                    "bar_chart_count": fdata,
                    "doughnut_chart_count": {"offer_count":docount,"active_count":dacount,"exit_count":decount},
                }
            });

        } else {
            return res.status(202).json({
                message: error
            });
        }
    })
}


