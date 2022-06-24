const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');
db.connect();

const restauranteRoutes = require("./routes/restaurantesRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");



app.use(express.json());
app.use("/restaurantes", restauranteRoutes);
app.use("/menus", menuRoutes);

module.exports = app;