const { default: mongoose } = require("mongoose");
const noteSchema = require("../models/noteSchema");

const getAll = async (req, res) => {
    try {
        const allNotes = await noteSchema.find();
        res.status(200).send(allNotes)
        
    } catch (err) {
        console.error(err)        
    }
};

const createNote = async (req, res) => {
    // const { author, title } = req.body;
    try {
        const newNote = new noteSchema({
            _id: new mongoose.Types.ObjectId(),
            author: req.body.author,
            title: req.body.title,
            createdAt: new Date()         
        });
        
        const savedNote = await newNote.save();

        if (savedNote) {
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
        const findNote = await noteSchema.findById(req.params.id)

        if(!findNote){
            res.status(404).send({
                "message" : "Nota não encontrada",
                "statusCode": 404
            })
        }

        findNote.author = req.body.author || findNote.author
    } catch (err) {
        console.error(err)        
    }    
}

const deleteNote = async (req, res) => {
    try {
        const deletedNote = await noteSchema.findByIdAndDelete(req.params.id)
        
        res.status(200).send({
            "message": "nota deletada com sucesso",
            deletedNote
        })
    } catch (err) {
        console.error(err)        
    }
}

module.exports = {
    getAll,
    createNote,
    updateNote,
    deleteNote
}