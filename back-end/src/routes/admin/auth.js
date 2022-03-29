const express = require('express');
const router = express.Router();
const {signin,signup, signout,updateProfile,requireSignin,updatePassword} = require('../../controllers/admin/auth');

router.post('/admin/signin',signin);
router.post('/admin/signup',signup);
router.post('/admin/signout',signout);
router.post('/admin/updateProfile',requireSignin,updateProfile);
router.post('/admin/updatePassword',requireSignin,updatePassword);

module.exports = router;