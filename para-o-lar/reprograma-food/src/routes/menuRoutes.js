const controller = require("../controllers/menuController.js");

const express = require("express");

const router = express.Router();



router.post("/new", controller.createNewMenu);
router.get("/lista", controller.findAllMenus);
router.get("/lista/:id", controller.findById);
router.get("/pratos", controller.findByDish);
router.delete("/delete/:id", controller.deleteById);
router.put("/update/:id", controller.updateMenu);



module.exports = router