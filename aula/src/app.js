const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');
db.connect();

app.use(express.json());

const noteRoutes = require('./routes/noteRoutes');
const tagRoutes = require('./routes/tagRoutes');

app.use("/notes", noteRoutes);
app.use("/tags", tagRoutes);

module.exports = app;