const express = require('express')
const routes = express.Router()
const controller = require('../controller/livros')

routes.get('/listar', controller.listarTodos)
routes.get('/listar/:id', controller.listarPorId)
routes.post('/cadastrar', controller.cadastrarLivro)

module.exports = routes