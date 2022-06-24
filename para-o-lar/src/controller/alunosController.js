const alunosSchema = require('../models/alunosSchema')


const getAll = async (request, response) => {

    try {
        const todosAlunos = await alunosSchema.find()
        response.status(200).send(todosAlunos)

    } catch (error) {
        console.error(error)
    }

}


const creatAluno = async (request, response) => {

    try {
        const novoAluno = new alunosSchema({
            nome: request.body.nome,
            atividade: request.body.atividade,
            idade: request.body.idade,
            endereço: request.body.endereço,
            telefone: request.body.telefone,
            objetivo: request.body.objetivo,
            detalhes: request.body.detalhes,
            createdAt: new Date()

        })

        console.log(novoAluno, "aluno salvo")

const salvarAluno = await novoAluno.save
if(salvarAluno){
response.status(201).send({

    "message": "Aluno cadastrado com sucesso! :)",

    salvarAluno

})

}



    } catch (error) {
        console.error(error);

    }

}



module.exports = {
    getAll,
    creatAluno

}