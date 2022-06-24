const NoteSchema = require("../models/noteSchema")

const getAll = async (request, response) => {
    try {
        const allNotes = await NoteSchema.find()
        response.status(200).send(allNotes)
    } catch (error) {
        console.error(error)
    }

}

const createNote = async (request, response) => {

    try {
        if (!request.body.author && !request.body.title) {
            response.status(404).send({
                "message": "Os campos obrigatórios precisam ser preenchidos",
                "statusCode": 404
            })
        }

        const newNote = new NoteSchema({
            //_id: new mongoose.Schema.Types.ObjectId,//é criado um id automaticamente no documento. Desta forma que estamos fazendo, estamos criando um id único para ficar dentro desse documento
            author: request.body.author,
            title: request.body.title,
            createdAt: new Date()
        })
        console.log("NOVA NOTA!", newNote)

        const savedNote = await newNote.save() //o 'save()' é usado para armazenar no banco de dados mongoose, ou seja, save é uma parte especifica do meu banco de dados

        if (savedNote) {
            response.status(201).send({
                "message": "Nota criada com sucesso!!! (:",
                savedNote
            })
        }

    } catch (error) {
        console.error(error)
    }

}

const updateNote = async (request, response) => {
    try{
        //atualizar o documento a partir do id
        //receber esse id da requisção
        
        //encontrar o documento que possui aquele id
        const findNote = await NoteSchema.findById(request.params.id)
        
        if(!findNote){
            response.status(404).send({
                "message":"Nota não encontrada",
                "statusCode": 404
            })
        }

        //confiro as informações atualizadsa
                            //novo valor || caso não vier nenhuma informação, mantem a informação que jávtinha
        findNote.author = request.body.author || findNote.author
        findNote.title = request.body.title || findNote.title

        //salvi as atualizações
        const savedNote = await findNote.save()
        //envio a resposta
        response.status(200).send({
            "message":"Nota atualizada com sucesso!",
            savedNote
        })


    }catch(error){
        console.error(error)
    }    

}

const deleteNote = async (request, response) => {
    try {
    //acessar o documento que será deletado
    const findNote = await NoteSchema.findById(request.params.id)

    //deletar esse documento
    await findNote.delete()

    response.status(200).send({
        "message": `Nota ${findNote} deletada!`,
        findNote
    })
    } catch (erro) {
        console.error(erro)
    }
    
}

module.exports = {
    getAll,
    createNote,
    updateNote,
    deleteNote,
}