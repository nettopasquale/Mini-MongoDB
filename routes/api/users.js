const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const LISTA_FUNCOES = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(LISTA_FUNCOES.Admin), userController.getAllUsers)
    .delete(verifyRoles(LISTA_FUNCOES.Admin), userController.deleteUser);

router.route('/:id')
    .get(verifyRoles(LISTA_FUNCOES.Admin), userController.getUser);

module.exports= router;