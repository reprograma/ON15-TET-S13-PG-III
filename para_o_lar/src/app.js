const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');
db.connect();
app.use(express.json());

app.use(express.json());

const feiraRoutes = require('./routes/feiraRoutes');

app.use("/feira", feiraRoutes);

module.exports = app;