const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../controllers/admin/auth');
const {get_userdata, get_roles, get_teamleads, get_tlemployees, get_dashboarddata, get_chartdata} = require('../../controllers/admin/admin');

router.post('/admin/get_userdata',requireSignin,get_userdata);
router.get('/admin/get_roles',requireSignin,get_roles);
router.post('/admin/get_teamleads',requireSignin,get_teamleads);
router.post('/admin/get_tlemployees',requireSignin,get_tlemployees);
router.post('/admin/get_dashboarddata',requireSignin,get_dashboarddata);
router.post('/admin/get_chartdata',requireSignin,get_chartdata);

module.exports = router;