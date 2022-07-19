const fornecedormodel = require('../models/fornecedorSchema')
const produtomodel = require('../models/produtoSchema')


const todosFornecedores = async (req, res) => {
    try {
        const fornecedores = await fornecedormodel.find()
        res.status(200).send(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const todosProdutos = async (req, res) => {
    try {
        const produtos = await produtomodel.find().populate({
            path: 'fornecedor',
            select: 'nome ramo'
        })
        res.status(200).send(produtos)
    } catch (error) {
        res.status(500).send(error.message)
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
        res.status(201).send(fornecedorSalvo)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


const cadastrarProduto = async (req, res) => {
    try {
        const buscarForncedor = await fornecedormodel.findById(req.body.fornecedor)
        if (!buscarForncedor) {
            res.status(404).send({
                "message": "Não existe nenhum forcedor com esse id,caso seja um fornecedor, por favor cadastra-lo antes de cadastrar o produto",
                "statusCode": 404
            })
        }
        if (!req.body.nome || !req.body.valor || !req.body.fornecedor) {
            res.status(404).send({
                "message": "Por favor informar dados obrigatorios, nome valor e forncedor!",
                "statusCode": 404
            })
        }
        const atualizarFornecedor = await buscarForncedor.updateOne({
            $push: {
                produtos: req.body.nome
            }
        })
        const novoProduto = new produtomodel({
            nome: req.body.nome,
            valor: req.body.valor,
            fornecedor: req.body.fornecedor,
            datadecastrado: new Date()
        })
        const produtoSalvo = await novoProduto.save()
        res.status(201).send(produtoSalvo)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const excluirProduto = async (req, res) => {
    try {
        const produtoExcluido = await produtomodel.findById(req.params.id)
        if (!produtoExcluido) {
            res.status(404).send({
                "message": "Não existe nenhum produto com esse id, por favor conferir os dados",
                "statusCode": 404
            })
        }
        const fornecedorProduto = await fornecedormodel.findById(produtoExcluido.fornecedor)
        await fornecedorProduto.updateOne({
            $pull: {
                produtos: produtoExcluido.nome
            }
        })
        await produtoExcluido.delete()
        res.status(200).json({
            message: "Produto excluido",
            produtoExcluido
        })
    } catch (error) {
        res.status(500).send(error.message)

    }
}

const excluirFornecedor = async (req, res) => {
    try {
        const fornecedorExcluido = await fornecedormodel.findById(req.params.id)
        if (!fornecedorExcluido) {
            res.status(404).send({
                "message": "Não existe nenhum fornecedor com esse id, por favor conferir os dados",
                "statusCode": 404
            })
        }
        if (fornecedorExcluido.produtos.length > 0) {
            res.status(404).send({
                "message": "Existe produtos que possuem esse fornecedor, por favor excluir todos os produtos do estoque antes de excluir o fornecedor",
                "statusCode": 404
            })
         }

        if(fornecedorExcluido.produtos.length == 0){
            await fornecedorExcluido.delete()
            res.status(200).send({
                message: "Fornecedor excluido",
                fornecedorExcluido
            })
    

        }   


    } catch (error) {
        res.status(500).send(error.message)
    }
}





module.exports = {
    todosFornecedores,
    todosProdutos,
    cadastrarFornecedor,
    cadastrarProduto,
    excluirProduto,
    excluirFornecedor
}