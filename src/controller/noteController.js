
const noteSchema = require("../models/noteSchema");

const getAll = async (request, response) => {
   try{
       const allNotes = await noteSchema.find();
       response.status(200).send(allNotes);

   } catch(err){
    console.error(err)
   }

    };

    const createNote = async (request, response) => {
     try {
        if(!request)
     } catch (error) {
        
     }
    }

const deletedeNote = async (request, response) => {
    try {
        const findNote = await noteSchema.findById
    } catch (error) {
        
    }
}

const deleteNote = async(request, response) =>

    module.exports={ 
        getAll,
        createNote, 
        updateNote,
        deletedeNote
    }