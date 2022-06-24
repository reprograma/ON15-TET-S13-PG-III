const express = require('express')
const router = require('express').Router();

const controller = require('../controller/alunosController')

router.get("/todos/", controller.getAll)
router.post("/cadastro", controller.creatAluno)



module.exports = router;