const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../controllers/admin/auth');
const {get_categories, add_category, update_category,delete_category, get_categories_by_dept, get_hsncodes} = require('../../controllers/admin/categories');

router.get('/admin/get_categories',requireSignin,get_categories);
router.get('/admin/get_hsn_codes',requireSignin,get_hsncodes);
router.post('/admin/add_category',requireSignin,add_category);
router.post('/admin/update_category',requireSignin,update_category);
router.post('/admin/delete_category',requireSignin,delete_category);
router.post('/admin/get_categories_by_dept',requireSignin,get_categories_by_dept);

module.exports = router;