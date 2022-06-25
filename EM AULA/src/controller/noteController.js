const NoteSchema = require ("../models/noteSchema") //primeiro passo é importar o schema

const getAll = async (req,res) => {

    try {

    const allNotes = await NoteSchema.find(); //trazendo todas as informações, nesse caso, não está servindo como filtro
    res.status(200).send(allNotes);

    } catch (err){
        console.error(err)
    }


};

const createNote = async (req,res) => {

   //body que vai ser construido no postman, lembrando q id e creatAd sao automaticos. Os outros estão sendo retirados do schema
    try{
if (!req.body.author || !req.body.title) {
        res.status(404).send({
            "message": "Os campos obrigatórios precisam ser preenchidos", 
            "statudCode": 404
        })
}

       const newNote = new NoteSchema ({
        author: req.body.author,
        title: req.body.title,
        createdAt: new Date()
        })

        const savedNote = await newNote.save()
        res.status(201).send({
            "message": "Nota criada com sucesso!",
            savedNote
        })

    } catch(err) {
        console.error(err);
    }
}

const updateNote = async (req, res) => {
    try{
        //atualizando através do id
        //receber o id da requisição
    const findNote = await NoteSchema.findById(req.params.id)
    if(!findNote){
        res.status(404).send({
            "message": "Nota não encontrada!",
            "statusCode": 404
        })
    }
    // encontrar o documento com o id, conferindo as info atualiadas
    findNote.author = req.body.author || findNote.author
    findNote.title = req. body.title  || findNote.title 
    
    //salvar as atualizações
        
    const savedNote = await findNote.save()
    //enviar as respostas
    res.status(200).send({
        "message": "nota atualizada com sucesso!",
        savedNote
    })
        
        } catch (err) {

        }
}

const deleteNote = async (req,res) => {
    try {
        //acessar o documento a ser deletado
        const findNote = await NoteSchema.findById(req.params.id)
        // deletar esse documento
    
        await findNote.delete()
    
        res.status(200).send({
            "message": "Nota deletada com sucesso",
            findNote
        })
} catch(err) {
    console.error(err);
}
}


   

    
module.exports = {
    getAll,
    createNote,
    updateNote, 
    deleteNote
}