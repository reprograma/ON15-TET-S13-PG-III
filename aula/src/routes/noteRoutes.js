const express = require("express");
const router = express.Router();

const controller = require("../controller/noteController");
const authController = require("../controller/authController");
const { checkAuth } = require("../middlewares/auth");

router.get("/all", checkAuth, controller.getAll);

router.get("/with-tags", controller.getNotesWithTags);
router.get("/with-study-tags", controller.getNotesWithStudyTag);

router.post("/create", controller.createNote);

router.post("/login", authController.login)

router.put("/update/:id", controller.updateNote);

router.delete("/delete/:id", controller.deleteNote);

module.exports = router;