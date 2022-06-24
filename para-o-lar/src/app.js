const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');
db.connect();

const storeRotas = require('./routes/decoraçãoStoreRoutes');

app.use(express.json());
app.use("/lojas", storeRotas);

module.exports = app;