const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../controllers/admin/auth');
const {get_userdata, get_departments, get_attributesbyname, get_cties} = require('../../controllers/admin/admin');

router.post('/admin/get_userdata',requireSignin,get_userdata);
router.post('/admin/get_attributesbyname',requireSignin,get_attributesbyname);
router.get('/admin/get_departments',requireSignin,get_departments);
router.get('/admin/get_cities',requireSignin,get_cties);

module.exports = router;