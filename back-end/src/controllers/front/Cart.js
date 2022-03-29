const mongo = require('../../connection.js').getDb();
const cart = mongo.collection("tbl_cart");

var ObjectId = require('mongodb').ObjectID;

exports.add_to_cart = (req,res) => {

    // console.log(data)

    cart.insertOne(data, function (error, result) {
        if (error) {
            return res.status(400).json({
                message: 'error occured'
            });
        }

        if (result) {
            return res.status(200).json({
                message: "Added To Cart"
            })
        }
    });
    
};

exports.update_cart = (req,res) => {

    var data = {};
    cart.updateOne({_id:req.body.id}, {$set: data}, function (error, result) {
        if (error) {
            return res.status(400).json({
                message: 'error occured'
            });
        }

        if (result) {
            return res.status(200).json({
                message: "Updated Successfully"
            })
        }
    });
};

exports.delete_cart = (req, res) => {

    const cat_data = {
        "is_deleted" : 1
    }

    cart.updateOne({_id:new ObjectId(req.body.id)}, {$set: cat_data}, function (error, result) {
        if (error) {
            return res.status(400).json({
                message: 'error occured'
            });
        }

        if (result) {
            return res.status(200).json({
                message: "Deleted Successfully"
            })
        }
    });
}

exports.get_cart_data = (req, res) => {

    cart.find({"is_deleted":0}).sort({_id:-1})
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

