const express = require('express')
const router = express.Router()
const controller = require('../controller/estoqueController')

router.post("/criarf", controller.cadastrarFornecedor)
router.post("/criarp", controller.cadastrarProduto)
router.get("/fornecedor",controller.todosFornecedores)
router.get("/produto",controller.todosProdutos)



module.exports = router