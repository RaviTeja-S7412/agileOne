const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../controllers/admin/auth');
const { get_allroutes, get_routes } = require('../../controllers/admin/routes');

router.get('/admin/get_allroutes',requireSignin,get_allroutes);
router.post('/admin/get_routes',requireSignin,get_routes);

module.exports = router;