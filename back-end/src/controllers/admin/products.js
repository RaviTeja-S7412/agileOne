const mongo = require('../../connection.js').getDb();
const products = mongo.collection("tbl_products");
const multer  = require('multer');
const path = require('path');

var ObjectId = require('mongodb').ObjectID;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../admin/public/uploads/products')
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        cb(null, Date.now() + path.extname(file.originalname))

        // You could use the original name
        // cb(null, file.originalname)
    }
});

var upload = multer({storage: storage})

exports.add_product = [upload.array('pimages[]',10),function(req,res){

    var pimages = [];
    if(req.files.length > 0){
        req.files.forEach(function(file){
            pimages.push("/uploads/products/"+file.filename);
        });
    }else{
        if(req.body.product_id){
            pimages = (req.body.product_id) ? req.body.old_product_images : [];   
        }
    }

    req.body.product_images = pimages;
    req.body.created_date = new Date();
    req.body.is_deleted = 0;
    req.body.status = 1;
    req.body.product_slug = req.body.product_name.toLowerCase().replace(" ","-");

    var data = {};
    Object.keys(req.body).forEach(function(key) {
        if(typeof req.body[key] === "object"){
            data[key]=JSON.stringify(req.body[key])
        }else{
            data[key] = req.body[key]
        }
    });

    // console.log(data)

        products.insertOne(data, function (error, result) {
            if (error) {
                return res.status(400).json({
                    message: 'error occured'
                });
            }

            if (result) {
                return res.status(200).json({
                    message: "Product Added Successfully"
                })
            }
        });
    
}];

exports.update_product = [upload.array('pimages[]',10),function(req,res){

    var pimages = [];
    if(req.files.length > 0){
        req.files.forEach(function(file){
            pimages.push("/uploads/products/"+file.filename);
        });
    }else{
        if(req.body.product_id){
            pimages = (req.body.product_id) ? req.body.old_product_images : [];   
        }
    }

    req.body.product_images = pimages;
    req.body.created_date = new Date();
    req.body.is_deleted = 0;
    req.body.status = 1;
    req.body.product_slug = req.body.product_name.toLowerCase().replace(" ","-");

    var data = {};
    Object.keys(req.body).forEach(function(key) {
        if(typeof req.body[key] === "object"){
            data[key]=JSON.stringify(req.body[key])
        }else{
            data[key] = req.body[key]
        }
    });


    var pr_id = (req.body.product_id) ? new ObjectId(req.body.product_id) : null;

    products.updateOne({_id:pr_id}, {$set: data}, function (error, result) {
        if (error) {
            return res.status(400).json({
                message: 'error occured'
            });
        }

        if (result) {
            return res.status(200).json({
                message: "Product Updated Successfully"
            })
        }
    });
}];

exports.delete_product = (req, res) => {

    const cat_data = {
        "is_deleted" : 1
    }

    products.updateOne({_id:new ObjectId(req.body.id)}, {$set: cat_data}, function (error, result) {
        if (error) {
            return res.status(400).json({
                message: 'error occured'
            });
        }

        if (result) {
            return res.status(200).json({
                message: "Category Deleted Successfully"
            })
        }
    });
}

exports.get_products = (req, res) => {

    products.find({"is_deleted":0}).sort({_id:-1})
        .toArray((error, result) => {

            if (error) {
                return res.status(400).json({ message: error });
            }

            if (result) {

                return res.status(200).json({
                    all_products: result,
                });
                    
            } else {
                return res.status(400).json({
                    message: error
                });
            }
        })
}


exports.get_productbyid = (req, res) => {
    products.find({"_id":new ObjectId(req.body.product_id)}).toArray((error, result) => {

            if (error) {
                return res.status(400).json({ message: error });
            }

            if (result) {

                return res.status(200).json({
                    product: result[0],
                });
                    
            } else {
                return res.status(400).json({
                    message: error
                });
            }
        })
}

