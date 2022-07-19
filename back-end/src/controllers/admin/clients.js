const mongo = require('../../connection.js').getDb();

const clients = mongo.collection("tbl_clients");
var ObjectId = require('mongodb').ObjectID;


exports.create_client = (req, res) => {
    
    if(!req.body.client_name){
        return res.status(202).json({ message: "Client Name is Required." });
    }

    const data = {
        "client_name": req.body.client_name,
        "created_date": new Date(),
        "updated_date": "",
        "status" : 1,
        "deleted" : 0
    }
    
    clients.find({ client_name: req.body.client_name }).toArray((error, result) => {
        if (result.length > 0) {
            return res.status(202).json({
                message: 'Client Name Already Exists.'
            });
        }

        clients.insertOne(data, function (error, result) {
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

exports.update_client = (req, res) => {
    
    if(!req.body.client_name){
        return res.status(202).json({ message: "Client Name is Required." });
    }
    if(!req.body.id){
        return res.status(202).json({ message: "Client ID is Required." });
    }

    const data = {
        "client_name": req.body.client_name,
        "updated_date": new Date(),
    }

    var errors = [];

    clients.find({ client_name: req.body.client_name }).toArray((error, result) => {
        if (result.length > 0) {
            if(result[0]._id != req.body.id){
                errors.push({message:"Client Name Already Exists."});
            }
        }

        if(errors.length == 0){
    
            clients.updateOne({_id:new ObjectId(req.body.id)}, {$set: data}, function (error, result) {
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

exports.get_clients = (req, res) => {

    var perPage = req.body.perPage ? req.body.perPage : 10,
    page = req.body.page-1
    var search = req.body.search
    const data = []

    clients.aggregate([
        { "$sort": { '_id' : -1 } },
        {$match: 
            {"status":1,"deleted":0,
                $or: 
                [ 
                    { client_name: { "$regex": search, "$options": "i"} },
                ] 
            },
        },
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
                        "client_name": element.client_name,
                        "created_date": new Date(element.created_date).toLocaleDateString('en-US'),
                    })

                });
            }

            clients.find({"status":1,"deleted":0, $or: 
                [ 
                    { client_name: { "$regex": search, "$options": "i"} },
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

exports.deleteClient = (req, res) => {

    const id = req.body.user_id;
    if(!id){
        return res.status(202).json({ message: "Client ID is Required." });
    }

    clients.deleteOne({ _id: new ObjectId(id) },(error, result) => {
        
        if (result.deletedCount > 0) {
            return res.status(200).json({ message: "Client Deleted Successfully" });
        }else{
            return res.status(202).json({ message: "Client Not Found" });
        }

    });

}

exports.get_singleclient = (req, res) => {

    const id = req.body.user_id;
    if(!id){
        return res.status(202).json({ message: "Client ID is Required." });
    }

    clients.find({ _id: new ObjectId(id) }).toArray((error, result) => {
        
        if (result.length > 0) {
            return res.status(200).json({ client_data: result[0] });
        }else{
            return res.status(202).json({ message: "Client Not Found." });
        }

    });

}

exports.get_allclients = (req, res) => {

    const data = []

    clients.aggregate([
        { "$sort": { '_id' : -1 } },
        {$match: 
            {"status":1,"deleted":0},
        },
    ])
    .toArray(function (err, db_data) {

        if(err){
            return res.status(202).json({message:err});
        }

        if(db_data.length > 0){
            db_data.forEach((element) => {
                
                data.push({
                    "id": element._id,
                    "client_name": element.client_name,
                    "created_date": new Date(element.created_date).toLocaleDateString('en-US'),
                })

            });
        }

        return res.status(200).json({
            all_clients: data,
        });   
    })
}

