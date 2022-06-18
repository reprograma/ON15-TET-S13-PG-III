const controller = require("../controller/noteController")

const express = require("express")
const router = express.Router()

router.get("/all", controller.findAll)

router.post("/new", controller.createNote)
router.put("/update/:id", controller.updateNote)
router.delete("/delete/:id", controller.deleteNote)

module.exports = router