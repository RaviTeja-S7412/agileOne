const express = require('express');
const router = express.Router();
const {signin,signup, signout,updateProfile,requireSignin,updatePassword, updateUser, getUsers, get_singleuser,deleteUser} = require('../../controllers/admin/auth');

router.post('/admin/signin',signin);
router.post('/admin/signup',signup);
router.post('/admin/signout',signout);
router.post('/admin/updateUser',requireSignin,updateUser);
router.delete('/admin/deleteUser',requireSignin,deleteUser);
router.post('/admin/updateProfile',requireSignin,updateProfile);
router.post('/admin/updatePassword',requireSignin,updatePassword);
router.post('/admin/get_users',requireSignin,getUsers);
router.post('/admin/get_singleuser',requireSignin,get_singleuser);

module.exports = router;