const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');
db.connect();

const establishmentRoutes = require('./routes/establishmentRoutes');

app.use(express.json());
app.use("/establishment", establishmentRoutes);

module.exports = app;
