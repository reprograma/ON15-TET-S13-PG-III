const express = require("express");
const router = express.Router();

const controller = require("../controller/noteController");

console.log(controller)

router.get("/all", controller.getAll);
router.post("/create", controller.createNote);

module.exports = router;
