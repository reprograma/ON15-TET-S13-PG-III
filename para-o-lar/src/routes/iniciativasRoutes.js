const express = require("express")

const controller = require("../controllers/iniciativasController")

const routes = express.Router()

routes.get("/all", controller.getAll)
routes.get("/filterName", controller.findByName)
routes.get("/filterThemes", controller.findByThemes)
routes.post("/create", controller.createIniciativa)
routes.get("/filter/:id", controller.findById)
routes.put("/update/:id", controller.updateIniciativa)
routes.delete("/delete/:id", controller.deleteById)
module.exports = routes