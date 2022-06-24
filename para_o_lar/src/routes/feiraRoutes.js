const express = require("express");
const router = express.Router();

const controller = require("../controller/feiraController");

router.get("/all", controller.getAll);

router.post("/register", controller.registerBusiness);

router.put("/update/:id", controller.updateBusiness);

router.delete("/delete/:id", controller.deleteBusiness);

module.exports = router;