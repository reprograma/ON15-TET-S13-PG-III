const express = require("express");
const router = express.Router();

const controller = require("../controllers/AlunosController")

router.get("/all", controller.getAll);

router.get("/name", controller.getByName);

router.post("/create", controller.createAluno);

module.exports = router; 