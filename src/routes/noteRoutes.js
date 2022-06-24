//chamar o express para acessar o método Router
const express = require("express")
//criar uma variavel para router e chamar o método
const router = express.Router()

//chamar o controller 
const controller = require("../controller/noteController")

//criar as rotas
router.get("/all", controller.getAllNotes)

router.post("/create", controller.createNote)

router.put("/update/:id", controller.updateNote)

router.delete("/delete/:id", controller.deleteNote)

//exportar o routes 
module.exports = router