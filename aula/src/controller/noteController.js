const NoteModel = require("../models/noteSchema")

const creatNewNote = async (request, response) => {
  const  {author, title, createdAt} = request.body
  if(!author || !title){
    response.status(400).json(
        {message: "Para criar uma nova nota, é necessário preencher o autor e título"}
    )
}

try {
    
    const newNote = new NoteModel({
        author,
         title,
        createdAt: new Date()
    })
    
    const savedNote = await newNote.save()

 

const findAll = await NoteModel.find()

if(savedNote){
    response.status(201).json({ "Nota Criada": newNote,
    "Notas": findAll

    })
}

} catch (error) {
    response.status(500).json({message: error.message})
}
}


const findAll = async (request, response) => {
    try {
        const findAll = await NoteModel.find()
        console.log(findAll)
    
        response.status(200).send({"Notas encontradas": findAll})
        
    } catch (error) {
        response.status(500).json({message: error.message})
        
    }

}

const updateNotes = async (request, response) => {
    try {
        const findNote = await NoteModel.findById(request.params.id)

        if (!findNote) {
            throw {
                statusCode: 404,
                message: "Nota não localizada",
                query: request.params
            }
        }

        findNote.author = request.body.author || findNote.author
        findNote.title = request.body.title || findNote.title

        const savedNote = await findNote.save()

        response.status(200).json({
            "nota atualizada": savedNote
        })
        
    } catch (error) {
        response.status(500).send({message: error.message})
    }
}

const deleteNote = async (request, response) => {
    try {
        const findNote = await NoteModel.findByIdAndDelete({_id : request.params.id})
        if(!findNote) {
            throw {
                "message" : "Id não localizado"
            }
        }
        response.status(200).json([{
            "item deletado": findNote}])
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}



module.exports = {
    creatNewNote,
    findAll,
    updateNotes,
    deleteNote
}
