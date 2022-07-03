const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');
db.connect(); 

const filmRoutes = require('./routes/filmRoutes');
const tagRoutes = require('./routes/tagRoutes');

app.use(express.json());
app.use("/films", filmRoutes);
app.use("/tags", tagRoutes);

module.exports = app;