const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');
db.connect();

const alunosRoutes = require('./routes/alunosRoutes');

app.use(express.json());
//app.use("/notes", noteRoutes);

module.exports = app;