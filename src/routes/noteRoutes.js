const controller = require('../controller/noteController')

const express = require('express')

const router = express.Router()

router.get("/all", controller.findAllNotes)
//conexão postman com controller

router.post("/note/create", controller.createNote)

router.delete("/delete/:id", controller.deleteNote)

router.put("/update/:id", controller.updateNote)

module.exports = router

