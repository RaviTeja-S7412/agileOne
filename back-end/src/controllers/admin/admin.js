const mongo = require('../../connection.js').getDb();

const users = mongo.collection("tbl_auths");
const departments = mongo.collection("tbl_departments");
const attributes = mongo.collection("tbl_attributes");
const cities = mongo.collection("tbl_cities");

var ObjectId = require('mongodb').ObjectID;

exports.get_userdata = (req, res) => {

    users.find({ _id: new ObjectId(req.body.user_id) })
        .toArray((error, result) => {

            if (error) {
                return res.status(400).json({ message: error });
            }

            if (result[0]) {

                var user = result[0];
                return res.status(200).json({
                    user: user,
                });
                    
            } else {
                return res.status(400).json({
                    message: error
                });
            }
        })
}

exports.get_cties = (req, res) => {

    cities.find({"status":1})
        .toArray((error, result) => {

            if (error) {
                return res.status(400).json({ message: error });
            }

            if (result) {

                return res.status(200).json({
                    cities: result,
                });
                    
            } else {
                return res.status(400).json({
                    message: error
                });
            }
        })
}

exports.get_departments = (req, res) => {

    departments.find({"status":1,"is_publish":1})
        .toArray((error, result) => {

            if (error) {
                return res.status(400).json({ message: error });
            }

            if (result) {

                return res.status(200).json({
                    departments: result,
                });
                    
            } else {
                return res.status(400).json({
                    message: error
                });
            }
        })
}

exports.get_attributesbyname = (req, res) => {

    attributes.find({})
        .toArray((error, result) => {

            if (error) {
                return res.status(400).json({ message: error });
            }

            if (result) {

                return res.status(200).json({
                    attributes: result,
                });
                    
            } else {
                return res.status(400).json({
                    message: error
                });
            }
        })
}
