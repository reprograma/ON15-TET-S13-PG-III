const express = require("express");
const router = express.Router();

const controller = require("../controller/decoraçãoStoreController");


router.get("/all", controller.getAll);

router.post("/create", controller.createStore);

router.put("/update/:id", controller.updateStore);

router.delete("/delete/:id", controller.deleteStore);

module.exports = router;