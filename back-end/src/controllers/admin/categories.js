const mongo = require('../../connection.js').getDb();
const categories = mongo.collection("tbl_categories");
const hsn_codes = mongo.collection("tbl_hsn_codes");
const multer  = require('multer');
const path = require('path');

var ObjectId = require('mongodb').ObjectID;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../admin/public/uploads/categories')
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        cb(null, Date.now() + path.extname(file.originalname))

        // You could use the original name
        // cb(null, file.originalname)
    }
});

var upload = multer({storage: storage})

exports.add_category = [upload.single("category_image"),function(req,res){

    let category_image = "";
    if(!req.file){
        category_image = req.body.old_image;
    }else{
        category_image = "/uploads/categories/"+req.file.filename;
    }
    var category_slug = req.body.category_name.toLowerCase().replace(" ","-");

    const cat_data = {
        "category_name": req.body.category_name,
        "department": req.body.department,
        "slug" : category_slug,
        "category_image" : category_image,
        "status" : 1,
        "is_publish" : 1,
        "is_deleted" : 0
    }

    categories.insertOne(cat_data, function (error, result) {
        if (error) {
            return res.status(400).json({
                message: 'error occured'
            });
        }

        if (result) {
            return res.status(200).json({
                message: "Category Added Successfully"
            })
        }
    });
}];

exports.update_category = [upload.single("category_image"),function(req,res){

    let category_image = "";
    if(!req.file){
        category_image = req.body.old_image;
    }else{
        category_image = "/uploads/categories/"+req.file.filename;
    }

    var category_slug = req.body.category_name.toLowerCase().replace(" ","-");

    const cat_data = {
        "category_name": req.body.category_name,
        "department": req.body.department,
        "slug" : category_slug,
        "category_image" : category_image
    }

    categories.updateOne({_id:new ObjectId(req.body.id)}, {$set: cat_data}, function (error, result) {
        if (error) {
            return res.status(400).json({
                message: 'error occured'
            });
        }

        if (result) {
            return res.status(200).json({
                message: "Category Updated Successfully"
            })
        }
    });
}];

exports.delete_category = (req, res) => {

    const cat_data = {
        "is_deleted" : 1
    }

    categories.updateOne({_id:new ObjectId(req.body.id)}, {$set: cat_data}, function (error, result) {
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

exports.get_categories = (req, res) => {

    categories.find({"is_deleted":0}).sort({_id:-1})
        .toArray((error, result) => {

            if (error) {
                return res.status(400).json({ message: error });
            }

            if (result) {

                return res.status(200).json({
                    all_categories: result,
                });
                    
            } else {
                return res.status(400).json({
                    message: error
                });
            }
        })
}

exports.get_hsncodes = (req, res) => {

    hsn_codes.find({}).sort({_id:-1})
        .toArray((error, result) => {

            if (error) {
                return res.status(400).json({ message: error });
            }

            if (result) {

                return res.status(200).json({
                    all_hsn_codes: result,
                });
                    
            } else {
                return res.status(400).json({
                    message: error
                });
            }
        })
}

exports.get_categories_by_dept = (req, res) => {

    categories.find({"is_deleted":0,"department":req.body.department_id}).sort({_id:-1})
        .toArray((error, result) => {

            if (error) {
                return res.status(400).json({ message: error });
            }

            if (result) {

                return res.status(200).json({
                    all_categories: result,
                });
                    
            } else {
                return res.status(400).json({
                    message: error
                });
            }
        })
}

