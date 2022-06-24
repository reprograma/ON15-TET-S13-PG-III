const alunosSchema = require('../models/alunosSchema')


const getAll = async (request, response) => {

    try {
        const todosAlunos = await alunosSchema.find()
res.status(200).send(todosAlunos)

    } catch (error) {
        console.error(err)
    }

}






module.exports = {
    connect
}