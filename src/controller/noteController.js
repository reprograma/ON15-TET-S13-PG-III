//importar o json/banco de dados
const NoteSchema = require("../models/noteSchema")

//Encontrar todos artistas [GET]
const getAllNotes = async(request, response) => {
    try {
        const allNotes = await NoteSchema.find()
        response.status(200).send(allNotes)
    } catch (error) {
        console.error(error) 
        response.status(500).send({ message: error.message })
    }
}

//Criar uma rota com controller para poder criar rotas [POST]
const createNote = async(request, response) => {
    try {
        if(!request.body.author || !request.body.title) {
            response.status(404).send({
               "message": "Os campos obrigatórios precisam ser enviados",
               "statusCode": 404
            })
       }

        const newNote = new NoteSchema({
           // _id: new mongoose.Schema.Types.ObjectId,
            author: request.body.author,
            title: request.body.title,
            createdAt: new Date()
        })

        const savedNote = await newNote.save();

        if(savedNote) {
            response.status(201).send({ 
                "message": "Nota criada com sucesso", 
                savedNote
            })  
        }
    } catch (error) {
            console.error(error)
    }
}

//atualizar [UPDATE]
const updateNote = async (request, response) => {
    try {
        //atualizar o documento a partir do id
        //receber id da requisição
        //encontrar o documento que possui aquele id
        const findNote =  await NoteSchema.findById(request.params.id)

        if(!findNote){
            response.status(404).send({
                "message": "Nota não encontrada",
                "statusCode": 404
            })
        }

        //confiro as informações atualizadas
        findNote.author = request.body.author || findNote.author
        findNote.title = request.body.title || findNote.title

        //salvo as atualizações
        const savedNote = await findNote.save()

        //envio a resposta
        response.status(200).send({
            "message": "Nota atualizada com sucesso",
            savedNote
        })

    } catch(error){
        console.error(error)
    }
}

//deletar nota [DELETE]
const deleteNote = async (request, response) => {
    try {
        //acessar o documento a ser deletado para
        const findNote =  await NoteSchema.findById(request.params.id)

        //deletar esse documento
        await findNote.delete()

        response.status(200).send({
            "message": `${findNote} deletada com sucesso`,
            findNote   
        })

    } catch (error){
        console.error(error)
    }
}

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
}