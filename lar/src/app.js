const express = require('express')
const cors = require('cors')
const db = require('./database/mongoConfig')

const app = express()

app.use(express.json())
app.use(cors())
db.connect()

const routes = require('./routes/livros')
app.use('/livros', routes)

module.exports = app