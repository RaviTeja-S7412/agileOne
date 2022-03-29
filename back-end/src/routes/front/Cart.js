const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../controllers/admin/auth');
const { add_to_cart,get_cart_data,add_to_cart,update_cart } = require('../../controllers/front/Cart');

router.post('/get_cart_data',get_cart_data);
router.post('/add_to_cart',add_to_cart);
router.post('/update_cart',update_cart);
router.post('/delete_cart',delete_cart);

module.exports = router;