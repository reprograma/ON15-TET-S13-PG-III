const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

require('dotenv-safe').config()

const db = require('./database/mongoConfig')
db.connect()

app.use(express.json())

const livrosRoutes = require('./routes/livrosRoutes')

app.use("/livros", livrosRoutes)

module.exports = app