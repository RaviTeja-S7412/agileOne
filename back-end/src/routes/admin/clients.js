const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../controllers/admin/auth');
const { get_clients, get_allclients, create_client, update_client,get_singleclient, deleteClient } = require('../../controllers/admin/clients');

router.post('/admin/get_clients',requireSignin,get_clients);
router.get('/admin/get_allclients',requireSignin,get_allclients);
router.post('/admin/create_client',requireSignin,create_client);
router.post('/admin/update_client',requireSignin,update_client);
router.post('/admin/get_singleclient',requireSignin,get_singleclient);
router.delete('/admin/delete_client',requireSignin,deleteClient);

module.exports = router;