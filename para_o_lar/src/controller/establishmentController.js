const establishmentSchema = require('../models/establishmentSchema')

const getAll = async (request, response) => {
    try {
        const allNotes = await noteSchema.find();
        response.status(200).send(allNotes);
    } catch(error) {
        console.error(error)

    }
   
}; 

module.exports = {
    getAll,
 
}