const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');
db.connect();

const teacherRoutes = require('./routes/teacherRoutes');

app.use(express.json());
app.use("/teacher", teacherRoutes);

module.exports = app;