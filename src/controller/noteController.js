const NoteSchema = require('../models/noteSchema')

const getAll = async (request, response) => {
    try {
        const allNotes = await NoteSchema.find()
        response.status(200).send(allNotes)
    } catch (error) {
        response.status(500).json({ message: error.message }) 
    }

}

const createNotes = async (request, response) =>{

    try {

        if(!request.body.author && !request.body.title){  //não entendi como funciona
            response.status(404).json({
                "message": "os campos devem ser enviados"
            })
        }

        const titleExist = NoteSchema.find({title: request.body.title}) // não funciona muito bem

        if(titleExist){
            response.status(404).json({
                "mensagem": " Titlulo ja cadastrado"
            })
        }
        const newNote = new NoteSchema ({
            // _id: new mongoose.Schema.Types.ObjectId, // não precisa colocar i id pois o proprio mongo coloca um id automaticamente
            author: request.body.author,
            title: request.body.title,
            createdAt: new Date() // funcionalidade do javascrit que coloca a data automaticamente

        })
        const saveNote = await newNote.save()
        response.status(201).send(saveNote)

    } catch (error) {
        response.status(500).json({ message: error.message })   
    }
}

const updateNote = async (request, response) => {
    try {

        const findNote = await NoteSchema.findById(request.params.id) // passado na URL

        if(!findNote){
            response.status(404).json({
                "mensagem": "id não encontrado"
            })
        }

        findNote.author = request.body.author || findNote.author
        findNote.title = request.body.title || findNote.title

        const saveNote = await findNote.save()

        response.status(200).json(saveNote)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const deleteNote = async (request, response) => {
    try {
        const findNote = await NoteSchema.findByIdAndDelete(request.params.id) // passado na URL

        await findNote.delete()


        response.status(200).json(findNote)

    } catch (error) {
        response.status(500).json({ message: error.message })

    }
}

module.exports = {
    getAll,
    createNotes,
    updateNote,
    deleteNote
} 