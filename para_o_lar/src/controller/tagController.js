const tagSchema = require('../models/tagSchema')

const findAlltags = async (request, response) => {
    try {

     const allTags = await tagSchema.find() // find em todos os prêmios do filme
        
     response.status(200).json(allTags)
 
    } catch (error) {
      response.status(500).json({ message: error.message})
    }
 }

const createTag = async (request, response) => {
      
    try {
        if(!request.body.prizes || !request.body.prizes) {
            response.status(404).send({
               "message": "Favor preencher os campos obrigatórios",
               "statusCode": 404
            })
       }


        const newTag = new createTag({
            
            filmId: request.body.filmId,
            prizes: request.body.prizes,
            year: request.body.year,
            createdAt: new Date() 
          
        })

        const savedTag = await newTag.save()
        
       
        response.status(201).json({
            message: "O prêmio referente ao filme foi adicionado com sucesso no banco de dados!",
            savedTag       
        })

    } catch (error) {
        response.status(500).json({ message: error.message})
        }
    }


const deleteTag = async (request, response) => {
    try {
       
        const findTag = await tagSchema.findById(request.params.id)

      
        const deletedTag = await findTag.remove()
       
        response.status(200).send({
            "message": "O prêmio referente ao filme foi deletado com sucesso do banco de dados :) ",
            findFilm
        })

    } catch(err) {
        console.error(err)
        }
}


 module.exports = {
    findAlltags,
    createTag,
    deleteTag,
    createTag
   
}