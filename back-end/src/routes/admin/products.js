const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../controllers/admin/auth');
const {get_products, add_product, update_product,delete_product, get_productbyid} = require('../../controllers/admin/products');

router.get('/admin/get_products',requireSignin,get_products);
router.post('/admin/add_product',add_product);
router.post('/admin/update_product',requireSignin,update_product);
router.post('/admin/delete_product',requireSignin,delete_product);
router.post('/admin/get_productbyid',requireSignin,get_productbyid);

module.exports = router;