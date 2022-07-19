const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../controllers/admin/auth');
const { get_employees, get_allemployees, create_employee, update_employee, get_singleemployee, deleteEmployee } = require('../../controllers/admin/employees');

router.post('/admin/get_allemployees',requireSignin,get_allemployees);
router.post('/admin/get_employees',requireSignin,get_employees);
router.post('/admin/create_employee',requireSignin,create_employee);
router.post('/admin/update_employee',requireSignin,update_employee);
router.post('/admin/get_singleemployee',requireSignin,get_singleemployee);
router.delete('/admin/delete_employee',requireSignin,deleteEmployee);

module.exports = router;