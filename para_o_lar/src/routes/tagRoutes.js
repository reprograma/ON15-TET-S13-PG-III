const controller = require('../controller/tagController')

const express = require('express')

const router = express.Router()

router.get("/all", controller.findAlltags)

// router.get("/uniontag/:id", controller.unionTag)

router.post("/tag/create", controller.createTag)

router.delete("/delete/:id", controller.deleteTag) 

module.exports = router


