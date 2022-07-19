const express = require("express");
const router = express.Router();

const controller = require("../controllers/campanhasController")

router.get("/all", controller.getAll);

router.get("/name", controller.getByName);

router.post("/create", controller.createCampanha);

module.exports = router; 
