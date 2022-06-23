const express = require("express");
const router = express.Router();

const controller = require("../controller/tagController");

router.get("/all", controller.getAll);

router.get("/color", controller.getTagByColor);

router.post("/create", controller.createTag);

module.exports = router;