const mongo = require('../../connection.js').getDb();
const bcrypt = require('bcrypt');

const employees = mongo.collection("tbl_employees");
var ObjectId = require('mongodb').ObjectID;


exports.create_employee = (req, res) => {
    
    if(!req.body.employee_name){
        return res.status(202).json({ message: "Employee Name is Required." });
    }
    if(!req.body.employee_id){
        return res.status(202).json({ message: "Employee ID is Required." });
    }
    if(!req.body.mobile_number){
        return res.status(202).json({ message: "Mobile Number is Required." });
    }
    if(!req.body.email){
        return res.status(202).json({ message: "Email is Required." });
    }

    const data = {
        "employee_name": req.body.employee_name,
        "employee_id": req.body.employee_id,
        "mobile_number": req.body.mobile_number,
        "password": bcrypt.hashSync(req.body.password, 10),
        "email": req.body.email,
        "office_email": req.body.office_email,
        "address": req.body.address,
        "designation": req.body.designation,
        "created_date": new Date(),
        "team_lead": req.body.team_lead_id,
        "role": 5,
        "updated_date": "",
        "status" : 1,
        "deleted" : 0
    }
    
    employees.find({ employee_id: req.body.employee_id }).toArray((error, result) => {
        if (result.length > 0) {
            return res.status(202).json({
                message: 'Employee ID Already Exists.'
            });
        }

        employees.insertOne(data, function (error, result) {
            if (error) {
                return res.status(202).json({
                    message: 'error occured'
                });
            }

            if (result) {
                return res.status(200).json({
                    message: "Created Successfully"
                })
            }
        });
    });
}

exports.update_employee = (req, res) => {
    
    if(!req.body.employee_name){
        return res.status(202).json({ message: "Employee Name is Required." });
    }
    if(!req.body.employee_id){
        return res.status(202).json({ message: "Employee ID is Required." });
    }
    if(!req.body.mobile_number){
        return res.status(202).json({ message: "Mobile Number is Required." });
    }
    if(!req.body.email){
        return res.status(202).json({ message: "Email is Required." });
    }
    if(!req.body.id){
        return res.status(202).json({ message: "ID is Required." });
    }

    const data = {
        "employee_name": req.body.employee_name,
        "employee_id": req.body.employee_id,
        "mobile_number": req.body.mobile_number,
        "email": req.body.email,
        "office_email": req.body.office_email,
        "address": req.body.address,
        "designation": req.body.designation,
        "updated_date": new Date(),
        "team_lead": req.body.team_lead_id,
    }

    var errors = [];

    employees.find({ employee_id: req.body.employee_id }).toArray((error, result) => {
        if (result.length > 0) {
            if(result[0]._id != req.body.id){
                errors.push({message:"Employee ID Already Exists."});
            }
        }

        if(errors.length == 0){
    
            employees.updateOne({_id:new ObjectId(req.body.id)}, {$set: data}, function (error, result) {
                if (error) {
                    return res.status(202).json({
                        message: 'error occured'
                    });
                }

                if (result) {
                    return res.status(200).json({
                        message: "Updated Successfully"
                    })
                }
            });

        }else{
    
            return res.status(202).json(errors[0]);
    
        }
        
    });
}

exports.get_employees = (req, res) => {
    
    var perPage = req.body.perPage ? req.body.perPage : 10,
    page = req.body.page-1
    var search = req.body.search
    const data = []
    var role = req.body.role;
    var team_leads = req.body.team_leads;

    var query = {};
    if(role == 1){
        
    }else if(role == 3){
        query["team_lead"] = { $in : team_leads };
    }else{
        query["team_lead"] = req.body.team_lead_id;
    }
    query["deleted"] = 0;
    query["status"] = 1;

    employees.aggregate([
        { "$sort": { '_id' : -1 } },
        {$match: 
            {
                $and: [query],
                $or: 
                [ 
                    { employee_name: { "$regex": search, "$options": "i"} },
                    { employee_id: { "$regex": search, "$options": "i"} },
                    { mobile_number: { "$regex": search, "$options": "i"} },
                    { email: { "$regex": search, "$options": "i"} },
                    { office_email: { "$regex": search, "$options": "i"} },
                    { designation: { "$regex": search, "$options": "i"} },
                    { address: { "$regex": search, "$options": "i"} },
                ] 
            },
        },
        { "$addFields": {
            team_lead: {
                "$toObjectId": "$team_lead"
            },
        }},
        {$lookup: {
            from:'tbl_auths',
            localField: "team_lead",
            foreignField: "_id",
            as: "team_data"                                                                  
        }},
        { "$limit": perPage * req.body.page },
        { "$skip": perPage * page },
    ])
    .toArray(function (err, db_data) {

            if(err){
                return res.status(202).json({message:err});
            }

            
            if(db_data.length > 0){
                db_data.forEach((element) => {
                  
                    data.push({
                        "id": element._id,
                        "employee_name": element.employee_name,
                        "employee_id": element.employee_id,
                        "mobile_number": element.mobile_number,
                        "email": element.email,
                        "office_email": element.office_email,
                        "address": element.address,
                        "designation": element.designation,
                        "team_lead": element.team_data.length > 0 ?  element.team_data[0].admin_name : '',
                        "created_date": new Date(element.created_date).toLocaleDateString('en-US'),
                    })

                });
            }

            employees.find({$and: [query], $or: 
                [ 
                    { employee_name: { "$regex": search, "$options": "i"} },
                    { employee_id: { "$regex": search, "$options": "i"} },
                    { mobile_number: { "$regex": search, "$options": "i"} },
                    { email: { "$regex": search, "$options": "i"} },
                    { office_email: { "$regex": search, "$options": "i"} },
                    { designation: { "$regex": search, "$options": "i"} },
                    { address: { "$regex": search, "$options": "i"} },
                ] 
            }).count(function (err, count) {
                return res.status(200).json({
                    total_users: data,
                    pageIndex: req.body.page,
                    total_pages: Math.ceil(count / perPage),
                    total_users_count: count,
                    prevPage: page > 0 ? true : false,
                    nextPage: Math.ceil(count / perPage) === req.body.page ? false : true
                });   
            })
        })
}

exports.deleteEmployee = (req, res) => {

    const id = req.body.user_id;
    if(!id){
        return res.status(202).json({ message: "Employee ID is Required." });
    }

    employees.deleteOne({ _id: new ObjectId(id) },(error, result) => {
        
        if (result.deletedCount > 0) {
            return res.status(200).json({ message: "Employee Deleted Successfully" });
        }else{
            return res.status(202).json({ message: "Employee Not Found" });
        }

    });

}

exports.get_singleemployee = (req, res) => {

    const id = req.body.user_id;
    if(!id){
        return res.status(202).json({ message: "Employee ID is Required." });
    }

    employees.find({ _id: new ObjectId(id) }).toArray((error, result) => {
        
        if (result.length > 0) {
            return res.status(200).json({ employee_data: result[0] });
        }else{
            return res.status(202).json({ message: "Employee Not Found." });
        }

    });

}

exports.get_allemployees = (req, res) => {

    const data = []

    employees.aggregate([
        { "$sort": { '_id' : -1 } },
        {
            $match: {"status":1,"deleted":0,"team_lead":req.body.team_lead_id},
        },
        {
            $project: {employee_name:1}  
        }
    ])
    .toArray(function (err, db_data) {

            if(err){
                return res.status(202).json({message:err});
            }

            if(db_data.length > 0){
                db_data.forEach((element) => {
                  
                    data.push({
                        "id": element._id,
                        "employee_name": element.employee_name,
                    })

                });
            }

            return res.status(200).json({
                all_employees: data,
            });   
        })
}

