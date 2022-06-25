const NoteSchema = require('../models/noteSchema')

const findAllNotes = async (request, response) => {
    try {//função anonima (req, resp)
 
        //await - esperar a busca no banco de dados
        // senão js fazo response direto
     const allNotes = await NoteSchema.find() // find em todos os documentos
        
     response.status(200).json(allNotes)
 
    } catch (error) {
      response.status(500).json({ message: error.message})
    }
 }

//src/controller
//request/response função anonima
//try/catch
//exportar

//Schema
//id: mongoose.Schema.Types.ObjectId,
// author: {
//     type: String,
//     required: true
// },
// title: {
//     type: String,
//     required: true
// },
// createdAt: {
//     type: Date,
//     default: new Date()
// }
// });

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
        
        // if(savedNote){
        response.status(201).json({
            message: "nota adicionada",
            savedNote        
        })

    } catch (error) {
        response.status(500).json({ message: error.message})
        }
}


// PATCH DAYANE

// const atualizeNote = async (request, response) => {
      
//     try {
//         const atualizeNotes = await NoteSchema.findByIdAndUpdate(id) // find em todos os documentos
        
//         response.status(200).json(atualizeNotes)

//         const atualizeNote = new AtualizeSchema({
            
          
//             title: request.body.title,
            
          
//         })

//         const atualizeNotas = await atualizeNotas.save()
        
//         // if(savedNote){
//         response.status(201).json({
//             message: "nota adicionada",
//             savedNote    
//         })



    
//        } catch (error) {
//          response.status(500).json({ message: error.message})
//        }
//     }

// PATCH PROFESSORA


const updateNote = async (request, response) => {
    try {
        // atualizar o documento a partir id
            // receber esse id da requisição
        // encontrar o documento que possui aquele id
        const findNote = await NoteSchema.findById(request.params.id)

        if(!findNote){
            res.status(404).send({
                "message": "Nota não encontrada",
                "statusCode": 404
            })
        }

        // confiro as informações atualizadas
        // pega as informações do body do postman e, se não tiver atualização, mantém as mesmas
        findNote.author = request.body.author || findNote.author
        findNote.title = request.body.title || findNote.title

        // salvo as atualizações

        const savedNote = await findNote.save()
        // envio a resposta
        response.status(200).send({
            "message": "Nota atualizada com sucesso",
            savedNote
        })

    } catch(err) {
        console.error(err)
    }
    
}


//DELETE DAYANE


const deleteNote = async (request, response) => {
    try {
        // atualizar o documento a partir id
            // receber esse id da requisição
        // encontrar o documento que possui aquele id
        const findNote = await NoteSchema.findById(request.params.id)

        if(!findNote){
            res.status(404).send({
                "message": "Nota não encontrada",
                "statusCode": 404
            })
        }

        // confiro as informações atualizadas
        // pega as informações do body do postman 
        findNote.author = request.body.author 
        findNote.title = request.body.title 

    
        const deletedNota = await findNote.remove()
        // envio a resposta
        response.status(200).send({
            "message": "Nota deletada com sucesso",
        })

    } catch(err) {
        console.error(err)
    }
    
}


// DELETE PROFESSORA

//no word - print



 module.exports = {
    findAllNotes,
    createNote,
    updateNote,
    deleteNote    
}



