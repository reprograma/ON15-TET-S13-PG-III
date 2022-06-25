const express = require("express")
const router = express.Router()

const controller = require("../controllers/museumController")

router.get("/all", controller.getAll)
router.get("/with-tags", controller.getMuseumWithTags)
router.get("/with-free-tags", controller.getMuseumsWithFreeTag)
router.get("/search", controller.findByNameAndNeighborhood)

router.post("/create", controller.createMuseum)

router.put("/update/:id", controller.createMuseum)

router.delete("/delete/:id", controller.deleteMuseum)

module.exports = router