const fornecedormodel = require('../models/fornecedorSchema')
const produtomodel = require('../models/produtoSchema')


const todosFornecedores = async (req, res) => {
    try {
        const fornecedores = await fornecedormodel.find()
        res.status(200).send(fornecedores)
    } catch (error) {
        res.status(500).send(error)
    }
}

const todosProdutos = async (req, res) => {
    try {
        const produtos = await produtomodel.find()
        res.status(200).send(produtos)
    } catch (error) {
        res.status(500).send(error)
    }
}

const cadastrarFornecedor = async (req, res) => {
    try {
        if (req.body.nome == undefined || req.body.cnpj == undefined) {
            res.status(404).send({
                "message": "Os campos obrigatórios precisam ser enviados",
                "statusCode": 404
            })
        }
        const novoFornecedor = new fornecedormodel({
            nome: req.body.nome,
            cnpj: req.body.cnpj,
            ramo: req.body.ramo,
            produtos: [],
            datadecastrado: new Date()
        })
        const fornecedorSalvo = await novoFornecedor.save()
        res.status(200).send(fornecedorSalvo)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


const cadastrarProduto = async (req, res) => {
    try { 
        const buscarForncedor = await fornecedormodel.findById(req.body.fornecedor)
        if (buscarForncedor.length == 0) {
            res.status(404).send({
                "message": "Não existe nenhum forcedor com esse id,caso seja um fornecedor, por favor cadastra-lo antes de cadastrar o produto",
                "statusCode": 404
            })
        }
        if(!req.body.nome || !req.body.valor || !req.body.fornecedor){
            res.status(404).send({
                "message": "Por favor informar dados obrigatorios, nome valor e forncedor!",
                "statusCode": 404
            })
        }
        const atualizarFornecedor = await buscarForncedor.updateOne({ $push: { produtos: req.body.nome } })
        const novoProduto = new produtomodel({
            nome: req.body.nome,
            valor: req.body.valor,
            fornecedor: req.body.fornecedor,
            datadecastrado: new Date()
        })
        const produtoSalvo = await  novoProduto.save()
        res.status(200).send(produtoSalvo)
    } catch (error) {
        res.status(500).send(error.message)
    }
}



module.exports = {
    todosFornecedores,
    todosProdutos,
    cadastrarFornecedor,
    cadastrarProduto
}