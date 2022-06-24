const NoteSchema = require("../models/noteSchema")

const createNote = async (req, res) => {
   /*  const { author, title, createdAt } = req.body
    if(!author) {
        res.status(400).json({message: "Autor é obrigatório"})} */
    
try {
    if(!req.body.author || !req.body.title) {
        res.status(404).send({"message":"Itens obrigatórios",  "statusCode": 404
    })
    }
    const newNote = new NoteSchema({ 
        author: req.body.author,
        title: req.body.title,
        createdAt: new Date() 
    })

  /*   const alreadyExists = NoteSchema.find({ title: req.body.title})
    if(alreadyExists) {
        throw {
            statusCode: 404,
            message: "Titulo já existe."
        }
    } */

    const savedNote = await newNote.save()
    res.status(200).json(savedNote)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

}

const getAll = async (req, res) => {
    try {
        const allNotes = await NoteSchema.find()
    
        res.status(200).json(allNotes)
        
    } catch (error) {
        res.status(500).json({ message: error.message })
        
    }
}

const updateNotes = async (req, res) => {
    try {
        const findNote = await NoteSchema.findById(req.params.id)

        if (!findNote) {
            throw {
                statusCode: 404,
                message: "Nota não localizada",
                query: req.query
            }
        }

        findNote.author = req.body.author || findNote.author
        findNote.title = req.body.title || findNote.title

        const savedNote = await findNote.save()

        res.status(200).json({
            "nota atualizada": savedNote
        })
        
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

const deleteNote = async (req, res) => {
    try {
        const findNote = await NoteSchema.findByIdAndDelete({_id : req.params.id})
        if(!findNote) {
            throw {
                "message" : "Id não localizado"
            }
        }
        res.status(200).json([{
            "item deletado": findNote}])
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = {
    createNote,
    getAll,
    updateNotes,
    deleteNote
}
