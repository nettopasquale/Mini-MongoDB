const express = require('express')
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const LISTA_FUNCOES = require('../../config/roles_list');
const verifyRoles = require("../../middleware/verifyRoles");

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(LISTA_FUNCOES.Admin, LISTA_FUNCOES.Editor),employeesController.createNewEmployee)
    .put(verifyRoles(LISTA_FUNCOES.Admin, LISTA_FUNCOES.Editor),employeesController.updateEmployee)
    .delete(verifyRoles(LISTA_FUNCOES.Admin),employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;
