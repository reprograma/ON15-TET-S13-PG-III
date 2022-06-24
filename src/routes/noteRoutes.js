const express = require("express");
const router = express.Router();

const controller = require("../controller/noteController");

router.post("/create", controller.createNote)
router.get("/all", controller.getAll)
router.put("/update/:id", controller.updateNotes)
router.delete("/delete/:id", controller.deleteNote)


module.exports = router