const mongo = require('../../connection.js').getDb();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer  = require('multer');
const path = require('path');

const users = mongo.collection("tbl_auths");
var ObjectId = require('mongodb').ObjectID;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../admin/public/uploads/admin')
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        cb(null, Date.now() + path.extname(file.originalname))

        // You could use the original name
        // cb(null, file.originalname)
    }
});

var upload = multer({storage: storage})

exports.signup = (req, res) => {

    const user_data = {
        "admin_name": req.body.first_name,
        "email": req.body.email,
        "password": bcrypt.hashSync(req.body.password, 10),
        "role": 1
    }
    
    users.insertOne(user_data, function (error, result) {
        if (error) {
            return res.status(400).json({
                message: 'error occured'
            });
        }

        if (result) {
            return res.status(201).json({
                user: "Registered Successfully"
            })
        }
    });
}

exports.signin = (req, res) => {
    
    users.find({ email: req.body.email })
        .toArray((error, result) => {
            if (error) {
                return res.status(400).json({ message: error });
            }

            if (result[0]) {

                var user = result[0];
                var data = bcrypt.compareSync(req.body.password, user.password);
                
                if (data && user.role == 1) {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    res.cookie("token", token, { expiresIn: "1d" });
                    res.status(200).json({
                        token,
                        user: user,
                        message : "Logged in successfully"
                    });
                } else {
                    return res.status(400).json({
                        message: "Invalid Password"
                    });
                }

            } else {
                return res.status(400).json({
                    message: "User not registered with us."
                });
            }
        })
}

exports.updateProfile = [upload.single("file"),function(req,res){

    let profile_pic = "";
    if(!req.file){
        profile_pic = req.body.old_picture;
    }else{
        profile_pic = "/uploads/admin/"+req.file.filename;
    }
    const id = req.body.user_id;
    const user_data = {
        "first_name" : req.body.first_name,
        "profile_picture" : profile_pic
    }

    users.updateOne({_id:new ObjectId(id)}, {$set: user_data}, function (error, result) {
        if (error) {
            return res.status(400).json({
                message: "Error Occured"
            });
        }
        if (result) {
            users.find({ _id: new ObjectId(id) })
                .toArray((error, userdata) => {
                return res.status(200).json({
                    message: "Updated Successfully",
                    user : userdata[0]
                })
            });
        }
    });


}];

exports.updatePassword = (req,res) => {
    
    const id = req.body.user_id;

    if(req.body.new_password != req.body.confirm_password){

        return res.status(400).json({
            message: "New password & confirm passwords are not equal."
        });    
        
    }

    users.find({ _id:new ObjectId(id) })
        .toArray((error, result) => {
            if (error) {
                return res.status(400).json({ message: error });
            }

            if (result[0]) {

                var user = result[0];
                bcrypt.compare(req.body.old_password, user.password, function (err, data) {

                    if(data){

                        bcrypt.hash(req.body.new_password, 10, function(err, hash) {

                            const user_data = {
                                "password" : hash
                            }

                            users.updateOne({_id:new ObjectId(id)}, {$set: user_data}, function (error, result) {
                                if (error) {
                                    return res.status(400).json({
                                        message: "Error Occured"
                                    });
                                }
                                if (result) {
                                    users.find({ _id: new ObjectId(id) })
                                        .toArray((error, userdata) => {
                                        return res.status(200).json({
                                            message: "Password Updated Successfully",
                                            user : userdata[0]
                                        })
                                    });
                                }
                            });
                        });
                        
                    }else{
                        return res.status(400).json({
                            message: "Old Password is wrong"
                        });    
                    }    

                });

            }else{
                return res.status(400).json({
                    message: "Error Occured"
                });
            }

        });


};

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Signout successfully...!",
    });
};
