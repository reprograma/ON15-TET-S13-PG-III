const express = require('express');
const app = express();
const rotas = require('../src/routes/rotasEstoque')
const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();

const db = require('../src/database/mongoConfig');
db.connect();

app.use(express.json());
app.use(rotas)

module.exports = app;