const express = require("express")
const router = express.Router()
const controller = require("../controllers/livrosController")

router.get("./all", controller.getAll)
router.post("/create", controller.createLivro)
router.put("/update/:id", controller.updateLivro)
router.delete("/delete/:id", controller.deleteLivro)

module.exports = router