const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../controllers/admin/auth');
const {get_brands, add_brand, update_brand,delete_brand} = require('../../controllers/admin/brands');

router.get('/admin/get_brands',requireSignin,get_brands);
router.post('/admin/add_brand',requireSignin,add_brand);
router.post('/admin/update_brand',requireSignin,update_brand);
router.post('/admin/delete_brand',requireSignin,delete_brand);

module.exports = router;