const { Mongoose } = require("mongoose");
const NotesSchema = require ("../models/noteSchema")

const getAll = async (req, res) => {
    try {
        const allNotes = await NotesSchema.find();
        res.status(200).send({
            "message": "Todas as notas são",
            allNotes
        });
    } catch (err) {
       console.error(err)
    }
}

const createNote = async (req, res) => {
// const { author, title } = req.body; outra forma de fazer
    
    try {
        if(!req.body.author || !req.body.title) {
            res.status(404).send({
                "message": "Os campos obrigatórios precisam ser enviados",
                "statusCode": 404
            })

        }
       const newNote = new NotesSchema ({
        //    _id: new Mongoose.Schema.Types.ObjectId(),
           author: req.body.author,
           title: req.body.title,
           createdAt: new Date(),
       });

       const savedNote = await newNote.save();

       if(savedNote){
       res.status(201).send({
        "message": "Nota criada com sucesso",   
        savedNote
    })
    }

    } catch (err) {
        console.error(err)
    }

}

const updateNote = async (req, res) => {
    try {
       // atualizar o documento a partir da id
       // receber esse id da requisição
       //encontrar o documento que possui aquele id
        const findNote = await noteSchema.findById(req.params.id)
        
        if(!findNote){
            res.status(404).send({
                "message": "Nota não encontrada",
                "statusCode": 404
            })
        }

       //confiro as informações atualizadas
        findNote.author = req.body.author || findNote.author
        findNote.title = req.body.title || findNote.title
       
        // salvo as atualizações
        const savedNote = await findNote.save()
       
        //envio a resposta
        res.status(200).send({
            "message": "Nota atualizada com suceso",
            savedNote
        })
    } catch (error) {
        console.error(err)
    }
}

const deleteNote = async (req, res) => {
    try {
        const findNote = await noteSchema.findById(req.params.id)
        if(!findNote){
            res.status(404).send({
                "message": "Nota não encontrada",
                "statusCode": 404
            })
        }
        const deletedNote = await findNote.delete() // Aqui não precisa nem dessa const, podia ser direto no await e aí na res seria findNote ao invés de deletedNote

        res.status(200).send({
            "message": "Nota deletada com suceso",
            deletedNote
        })
        
    } catch (error) {
        console.error(err)
    }
}

// Outra forma de fazer o delete, mais curta e por isso melhor:
// const deleteNote = async (req, res) => {
//     try {
//         await NoteSchema.findByIdAndDelete(req.params.id) //Poderia fazer uma const aqui pra ser = a esse await e aí poderia passar a const na res só para mostrar o que foi deletado
        
//         res.status(200).send({
//             message: "Nota deletada com sucesso."
//         })
//     } catch (error) {
//         res.status(500).send({
//             message: error.message
//         })
//     }
// }


module.exports = {
    getAll,
    createNote,
    updateNote,
    deleteNote

}