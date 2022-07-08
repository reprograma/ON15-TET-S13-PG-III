const controller = require("../controllers/restaurantesController.js");

const express = require("express");

const router = express.Router();

router.get("/lista", controller.findAllRestaurants);
router.get("/lista/:id", controller.findById);
router.get("/name_search", controller.findByName);
router.post("/new", controller.createNewRestaurant);
router.delete("/delete/:id", controller.deleteById);
router.put("/update/:id", controller.updateRestaurant);


router.patch("/evaluate/:id", controller.evaluateRestaurant);


module.exports = router