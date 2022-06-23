const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');
db.connect();
app.use(express.json());

<<<<<<< HEAD
const noteRoutes = require('./routes/noteRoutes');
=======
app.use(express.json());

const noteRoutes = require('./routes/noteRoutes');
const tagRoutes = require('./routes/tagRoutes');

>>>>>>> a50a0073bcbd3b1eb75a8724e0f52a5eceb0d5ea
app.use("/notes", noteRoutes);
app.use("/tags", tagRoutes);

module.exports = app;