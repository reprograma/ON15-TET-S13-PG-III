const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();

const db = require('./src/database/mongoConfig');
db.connect();

const storeRoutes = require('./src/routes/storeRoutes');

app.use(express.json());
app.use("/store", storeRoutes);

module.exports = app;