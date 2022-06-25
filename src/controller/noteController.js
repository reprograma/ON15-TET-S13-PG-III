const noteSchema = require('../models/noteSchema')

const getAll = async (request, response) => {
    try {
        const allNotes = await noteSchema.find();
        response.status(200).send(allNotes);
    } catch(error) {
        console.error(error)

    }
   
}; 

const createNote = async (request, response) => {
    // const { author, title } = request.body;
    try {

        if(!request.body.author || !request.body.title) {
            response.status(404).send({
               "message": "Os campos obrigatórios precisam ser enviados",
               "statusCode": 404
            })
       }

        const newNote = new noteSchema ({
            // _id: new mongoose.Schema.Types.ObjectId,
            author: request.body.author,
            title: request.body.title,
            createdAt: new Date()

        });
        
        console.log('NOVA NOTA', newNote);

        const savedNote = await newNote.save();
        
        if(savedNote){
            response.status(201).json({
                'message': 'Nota criada com sucesso',
                savedNote
            })

        }
        
    } catch(error) {
        console.error('erro:', error)

    }
   
}; 

const updateNote = async(request, response) => {
    try{
        const findNote = await noteSchema.findById(request.params.id)

        if(!findNote){
            //atualizar o documento a partir id
            // receber esse id da requisição
            //encontrar o documento que possui aquele id
            response.status(404).send({
                'message': 'Nota não encontrada',
                'statusCode': 404
            })
        }

        //confiro as informações atualizadas
        console.log('AUTOR ANTES DA REATRIBUIÇÃO', findNote.author)
        findNote.author = request.body.author || findNote.author
        console.log('AUTOR DEPOIS DA REATRIBUIÇÃO', findNote.author)

        findNote.title = request.body.title || findNote.title

        //salvo as atualizações
        const savedNote = await findNote.save()

        response.status(200).send({
            'message': 'Nota atualizada com sucesso',
            savedNote
        })


    } catch(error) {
        console.error(error)
    }
} 

const deleteNote = async (request, response) => {
    try {
        // acessar o documento a ser deletado
        const findNote = await noteSchema.findById(request.params.id)

        //deletae esse documento
        await findNote.delete()
        // outra forma
        //const findNote = await noteSchema.findByIdAndDelete(request.params.id)

        response.status(200).send({
            'message': 'Nota deletada com sucesso',
            findNote
        })

    } catch(error) {
        console.error(error);
    };

    
};





module.exports = {
    getAll,
    createNote,
    updateNote, 
    deleteNote 
}