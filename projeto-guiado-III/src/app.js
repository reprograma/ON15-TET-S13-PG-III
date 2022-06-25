const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())

require("dotenv-safe").config()

const db = require("./database/mongoConfig")
db.connect()


app.use(express.json())

const museumRoutes = require("./routes/museumRoutes")
const tagRoutes = require("./routes/tagRoutes")

app.use("/museums", museumRoutes)
app.use("/tags", tagRoutes)

module.exports = app