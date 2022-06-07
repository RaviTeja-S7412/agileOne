const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../controllers/admin/auth');
const { get_allroutes } = require('../../controllers/admin/routes');

router.get('/admin/get_allroutes',requireSignin,get_allroutes);

module.exports = router;