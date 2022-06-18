const controller = require("../controller/noteController");

const express = require("express");

const router = express.Router();

router.get("/all", controller.getAll);
router.post("/create", controller.createNote);
router.put("/update/:id", controller.updateNote); // Rotas com parâmetro id precisam ficar abaixo das outras rotas
router.delete("/delete/:id", controller.deleteNote)

module.exports = router;