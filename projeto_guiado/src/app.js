const express = require ("express")
const app = express()

const cors = require("cors")
app.use(cors())

require("dotenv-safe").config()

const db = require("./database/mongoConfig")
db.connect()

app.use(express.json())

const albumRoutes = require("./routes/albumRoutes")
const artistRoutes = require("./routes/artistRoutes")

app.use("/album", albumRoutes)
app.use("/artist", artistRoutes)

module.exports = app