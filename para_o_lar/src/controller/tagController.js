// const filmSchema = require('../models/filmSchema')
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


 // const unionTag = async (request, response) => {
    
    // using mongodB.Bson;
    // using mongodB.Driver;
    
    // new BsonArray
    // {

    //     // const db = db.orders.aggregate(request.params.id) 
        

           
    //         new BsonDocument("$lookup",
    //         new BsonDocument
    //             {
    //                 { "from", "tag" },
    //                 { "localField", "_id" },
    //                 { "foreignField", "film_id" },
    //                 { "as", "agragacao" }
    //             })

    // }

   
// const tagDb = require('../database/mongoConfig')

// const unionTag = async (request, response) => {
//     try {
//       const unionTags = await tagSchema.findById(request.params.id)
//       // filmSchema.find(_id, _id)
//        db.film.find()([
//         {
//           $unwind: "$filmSchema",
//         },
//         {
//           $lookup: {
//             from: "films",
//             localField: "_id",
//             foreignField: "_id",
//             as: "film_union",
//           },
//         },
//         {
//           $unwind: "filmSchema",
//         },
//         {
//           $match: {
//             "id.prizes": "_id"
//           }
//         },
//       ])
    
//       // throw new Error(err);
//       response.status(200).json(unionTags)


//     } catch(err) {
//       // throw new Error(err);
//       console.error(err)
//         }

//     }

 module.exports = {
    findAlltags,
    createTag,
    deleteTag,
    // unionTag
}