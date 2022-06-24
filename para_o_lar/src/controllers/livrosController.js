const livro = require("../models/livrosSchema")

const getAll = async(request,response) => {
    try {
        const allLivros = await livro.find()
        response.status(200).send(allLivros)
    } catch (err) {
        console.error(err)
    }
}

const createLivro = async (request, response) => {
    try {
        if(!req.body.author || !req.body.title || !req.body.edition || !req.body.genre || !req.body.ilustration || !req.body.frontcover || !req.body.publishingcompany) {
            response.status(404).send({
                "message": "Os campos obrigatórios precisam ser enviados",
                "statusCode": 404
            })
        }

        const newLivro = new livro ({
            author: request.body.author,
            title: request.body.title,
            edition: request.body.title,
            genre: request.body.genre,
            ilustration: request.body.ilustration,
            frontcover: request.body.frontcover,
            publishingcompany: request.body.publishingcompany,
            createdAt: new Date()
        })

        const savedLivro = await newLivro.save()

        if(savedLivro) {
            response.status(201).send({
                "message": "Livro cadastrado com sucesso!",
                savedLivro
            })
        }
    } catch(err) {
        console.error(err)
    }
}

const updateLivro = async (request, response) => {
    try {
        const findLivro = await livro.findById(request.params.id)
        console.log("Livro encontrado.", findLivro)

        if(!findLivro){
            response.status(404).send({
                "message": "Livro não encontrado.",
                "statusCode": 404
            })
        }

        findLivro.author = request.body.author || findLivro.author
        findLivro.title = request.body.title || findLivro.title
        findLivro.edition = request.body.edition || findLivro.edition
        findLivro.genre = request.body.genre || findLivro.genre
        findLivro.ilustration = request.body.ilustration || findLivro.ilustration
        findLivro.frontcover = request.body.frontcover || findLivro.frontcover
        findLivro.publishingcompany = request.body.publishingcompany || findLivro.publishingcompany

        const savedLivro = await findLivro.save()

        response.status(200).send({
            "message": "Livro atualizado com sucesso!",
            savedLivro
        })
    } catch(err) {
        console.error(err)
    }
}

const deleteLivro = async (request, response) => {
    try {
        const deleteLivro = await livro.findByIdAndDelete(request.params.id)

        response.status(200).send({
            "message": "Livro deletado com sucesso!",
            deleteLivro
        })
    } catch(err) {
        console.error(err)
    }
}

module.exports = {
    getAll,
    createLivro,
    updateLivro,
    deleteLivro
}