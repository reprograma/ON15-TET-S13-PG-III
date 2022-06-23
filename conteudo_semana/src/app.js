const express = require('express'); //importando/require o framework express-modulo externo
const app = express(); // para utilizar as funcionalidade do express, devemos instânciar


const cors = require('cors'); //importando o cors - modulo externo
app.use(cors()); // usando as funcionalidades do cors do framework express - instânciando

app.use(express.json()); // usando as funcionalidades do express.json do framework express - instânciando - para conseguir ler as requisições do bory

require('dotenv-safe').config(); // mais seguro, pois já vem com .env.exxample. No dotenv tbm dá para criar .env.exxample

const db = require('./database/mongoConfig'); // importando o arquivo do banco de dados - modulo interno?
db.connect(); // o connnect foi exportado no arquivo do banco de dados, e lá que está a conecção

const noteRoutes = require('./routes/noteRoutes'); // importando o arquivo de rotas - modulo interno
app.use("/notes", noteRoutes); //definindo a rota principal, alem do notes ser a rota principal , ele é a nossa coleção(colection) no nosso banco de dados 

module.exports = app; // exportando o modulo interno app