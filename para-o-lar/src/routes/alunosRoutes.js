const express = require('express')
const { get } = require('express/lib/response')

const router = express.Router

const controller = require('../controller/alunosController')

router.get("/todos/", controller.getAll)



module.exports = router;