const express = require("express");

const router = express.Router();
 //router é um gerenciador para funcionar as rotas; instanciar = deixar disponível

 const controller = require("../controller/noteController"); 

router.get("/all", controller.getAll);
router.post("/create", controller.createNote);
router.put("/update/:id", controller.updateNote);
router.delete("/delete/:id", controller.deleteNote)

 module.exports = router;