const express = require("express");
const app = express();

const cors = require("cors")
app.use(cors());

require('dotenv-safe').config();

const db = require("./database/mongoConfig");
db.connect();

app.use(express.json());
app.use(express.json());

const iniciativasRoutes = require("./routes/iniciativasRoutes");
const campanhasRoutes = require('./routes/campanhasRoutes');

app.use("/iniciativas", iniciativasRoutes);
app.use("/campanhas", campanhasRoutes);

module.exports = app;