const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();
app.use(express.json());

const db = require('./src/database/mongoConfig');
db.connect();

const storeRoutes = require('./src/routes/storeRoutes');

app.use("/store", storeRoutes);

module.exports = app;
