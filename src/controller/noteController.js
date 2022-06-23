const NoteSchema = require("../models/noteSchema");

const getAll = async (request, response) => {

    try {
        const allNotes = await NoteSchema.find();
        response.status(200).send(allNotes)
    
    } catch (err){
        console.error(err)
    }
};


const createNote = async (request, response) => {
    //const {author, title} = req.body

    try {
   
     const newNote = new NoteSchema({
            
            //_id: new mongoose.Schema.Types.ObjectId,
            author: request.body.author,
            title: request.body.title,
            createdAt: new Date()
        });
        

         console.log("NOVA NOTA", newNote)
    
         const savedNote = await newNote.save();
         
         if(savedNote) {
         response.status(201).send({
           "message": "Nota criada com sucesso",
         savedNote
})
}
        } catch (err) {
            console.error(err)
    }
}

// Atualizar Nota

const updateNote = async(request, response)=>{
    
try {

    const idRequest = request.params.id
    const bodyRequest = request.body
    const notaEncontrada = NoteSchema.find(nota => nota.id == idRequest)

    bodyRequest.id = idRequest
    notaEncontrada = bodyRequest
    
    response.status(200).json([{
        "mensagem": "Nota atualizada com sucesso",
        "Nota-atualizada": notaEncontrada,
        NoteSchema
    }])}
} catch (err) {
    console.error(err)
}



module.exports = {
    getAll,
    createNote
}
