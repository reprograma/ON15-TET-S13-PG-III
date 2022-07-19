const express = require('express')
const router = express.Router()
const controller = require('../controller/estoqueController')

router.post("/fornecedor/cadastrar", controller.cadastrarFornecedor)
router.post("/produto/cadastrar", controller.cadastrarProduto)
router.get("/fornecedor",controller.todosFornecedores)
router.get("/produto",controller.todosProdutos)
router.delete("/produto/excluir/:id",controller.excluirProduto)
router.delete("/fornecedor/excluir/:id",controller.excluirFornecedor)


module.exports = router