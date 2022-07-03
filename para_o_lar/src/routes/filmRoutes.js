const controller = require('../controller/filmController')

const express = require('express')

const router = express.Router()

router.get("/all", controller.findAllfilms)

router.get("/tags", controller.findAllfilmsWithTags)

router.post("/film/create", controller.createFilm)

router.delete("/delete/:id", controller.deleteFilm)

router.put("/update/:id", controller.updateFilm)

module.exports = router
