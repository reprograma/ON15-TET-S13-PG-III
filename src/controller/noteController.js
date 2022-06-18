const NoteSchema = require("../models/noteSchema")

const findAll = async (request, response) => {
    try {
        const note = await NoteSchema.find()
        response.status(200).send(note)
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

const createNote = async (request, response) => {
    try {
        if(!request.body.author || !request.body.title) {
            response.status(404).send({
                "message": "Os campos obrigatórios precisam ser enviados",
                "statusCode": 404
            })
        }

        const newNote = new NoteSchema({
            author: request.body.author, 
            title: request.body.title, 
            createdAt: new Date()
        })
        const savedNote = await newNote.save()

        if(savedNote) {
            response.status(201).send({
                message: "Nota criada com sucesso",
                savedNote
            })
        }
    } catch (error) {
        response.status(500).send({ 
            message: error.message 
        })
    }
}

const updateNote = async (request, response) => {
    try {
        const findNote = await NoteSchema.findById(request.params.id)

        if(!findNote){
            response.status(404).send({
                message: "Nota não encontrada",
                "statusCode": 404
            })
        }

        findNote.author = request.body.author || findNote.author
        findNote.title = request.body.title || findNote.title
        
        const savedNote = await findNote.save()
        response.status(200).send({
            message: "Nota atualizada com sucesso.",
            savedNote
        })
    } catch (error){
        response.status(500).send({
            message: error.message
        })
    }
}

const deleteNote = async (request, response) => {
    try {
        const deletedNote = await NoteSchema.findByIdAndDelete(request.params.id)
        
        response.status(200).send({
            message: "Nota deletada com sucesso.",
            deletedNote
        })
    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }
}

module.exports = {
    findAll,
    createNote,
    updateNote,
    deleteNote
}