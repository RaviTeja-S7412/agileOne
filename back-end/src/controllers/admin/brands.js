const mongo = require('../../connection.js').getDb();
const brands = mongo.collection("tbl_brands");
const multer  = require('multer');
const path = require('path');

var ObjectId = require('mongodb').ObjectID;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../admin/public/uploads/brands')
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        cb(null, Date.now() + path.extname(file.originalname))

        // You could use the original name
        // cb(null, file.originalname)
    }
});

var upload = multer({storage: storage})

exports.add_brand = [upload.single("brand_image"),function(req,res){

    let brand_image = "";
    if(!req.file){
        brand_image = req.body.old_image;
    }else{
        brand_image = "/uploads/brands/"+req.file.filename;
    }
    var brand_slug = req.body.brand_name.toLowerCase().replace(" ","-");

    const cat_data = {
        "brand_name": req.body.brand_name,
        "slug" : brand_slug,
        "brand_image" : brand_image,
        "status" : 1,
        "is_publish" : 1,
        "is_deleted" : 0
    }

    brands.insertOne(cat_data, function (error, result) {
        if (error) {
            return res.status(400).json({
                message: 'error occured'
            });
        }

        if (result) {
            return res.status(200).json({
                message: "Brand Added Successfully"
            })
        }
    });
}];

exports.update_brand = [upload.single("brand_image"),function(req,res){

    let brand_image = "";
    if(!req.file){
        brand_image = req.body.old_image;
    }else{
        brand_image = "/uploads/brands/"+req.file.filename;
    }

    var brand_slug = req.body.brand_name.toLowerCase().replace(" ","-");

    const cat_data = {
        "brand_name": req.body.brand_name,
        "slug" : brand_slug,
        "brand_image" : brand_image,
    }

    brands.updateOne({_id:new ObjectId(req.body.id)}, {$set: cat_data}, function (error, result) {
        if (error) {
            return res.status(400).json({
                message: 'error occured'
            });
        }

        if (result) {
            return res.status(200).json({
                message: "Brand Updated Successfully"
            })
        }
    });
}];

exports.delete_brand = (req, res) => {

    const cat_data = {
        "is_deleted" : 1
    }

    brands.updateOne({_id:new ObjectId(req.body.id)}, {$set: cat_data}, function (error, result) {
        if (error) {
            return res.status(400).json({
                message: 'error occured'
            });
        }

        if (result) {
            return res.status(200).json({
                message: "Brand Deleted Successfully"
            })
        }
    });
}

exports.get_brands = (req, res) => {

    brands.find({"is_deleted":0}).sort({_id:-1})
        .toArray((error, result) => {

            if (error) {
                return res.status(400).json({ message: error });
            }

            if (result) {

                return res.status(200).json({
                    all_brands: result,
                });
                    
            } else {
                return res.status(400).json({
                    message: error
                });
            }
        })
}

