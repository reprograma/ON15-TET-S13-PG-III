const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();

const db = require('../src/database/mongoConfig');
db.connect();

app.use(express.json());

module.exports = app;