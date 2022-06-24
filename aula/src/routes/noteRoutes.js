const controller = require("../controller/noteController")

const express = require("express");

const router = express.Router();

router.post("/new_note", controller.creatNewNote);

router.get("/all_notes", controller.findAll);
router.put("/update/:id", controller.updateNotes)
router.delete("/delete/:id", controller.deleteNote)

module.exports = router