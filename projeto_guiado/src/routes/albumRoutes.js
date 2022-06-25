const controller = require("../controllers/albumController")
const express = require("express")
const router = express.Router()

router.post("/create", controller.createAlbum)
router.get("/all", controller.getAllAlbums)
router.get("/by_id/:id", controller.getById)
router.get("/by_name", controller.getByName)
router.get("/genre", controller.getBygenre)
router.put("/update/:id", controller.updateAlbum)
router.delete("/delete/:id", controller.deleteAlbum)


module.exports = router