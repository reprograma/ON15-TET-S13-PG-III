const express = require("express")
require('dotenv-safe').config()

const cors = require("cors")
const db = require("./database/mongoConfig")

const app = express ()

app.use(express.json())

app.use(cors())

db.connect()

const iniciativasRota = require("./routes/iniciativasRoutes")

app.use("/iniciativas", iniciativasRota)

module.exports = app