const { Mongoose } = require("mongoose");
const iniciativaSchema = require("../models/iniciativasModel")

const getAll = async (req, res) => {
    try {
        const allIniciativas = await iniciativaSchema.find();
        res.status(200).json({
        "message": "Essas são todas as iniciativas cadastradas:",
        allIniciativas
    })
    } catch (err) {
        console.error(err)
     }
}

// const findById = (req, res) => {
//     try {
//         const getId = req.params.id
//         const findId = iniciativasModel.find(iniciativa => iniciativa.id == getId)
//         if (!findId) {
//             throw new Error ("Id não encontrado.")
//         }
//         return res.status(200).json({
//             "message": "Inciativa encontrada com sucesso",
//             findId
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
        
//     }
// }

// const findByName = (req, res) => {
//    console.log(findByName)
//     try {
//         const getName = req.query.nome
//         const findName = iniciativasModel.filter(iniciativa => iniciativa.nome.toLocaleLowerCase().includes(getName))
            
//         if (!findName) {
//             throw new Error ("Nome não encontrado.")
//         }
            

//         res.status(200).json({
//             "message": "Iniciativa encontrada",
//             findName
//         })

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }


// const findByTemas = (req, res) => {
//     try {
//         const getTemas = req.query.temas.toLocaleLowerCase()
//         const findTemas = iniciativasModel.filter(iniciativa => iniciativa.temas
//             .toString()
//             .toLocaleLowerCase()
//             .includes(getTemas))
            
        
//         if (findTemas.length == 0) {
//             throw new Error ("Tema não encontrado.")
//         }

//         res.status(200).json({
//             "message": "Iniciativas encontradas por temas",
//             findTemas
//         })

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }

const createIniciativa = async (req, res) => {
    try {
        if(!req.body.name || !req.body.city) {
            res.status(404).send({
                "message": "Os campos obrigatórios precisam ser enviados",
                "statusCode": 404
            })

        }

        // Fazer um if para caso o nome já seja cadastrado
        
        const newIniciativa = new iniciativaSchema ({
            name: req.body.name,
            city: req.body.city,
            themes: req.body.themes,
            description: req.body.description,
            site:req.body.site,
            national: req.body.national,
            dateCreated: new Date()
        })

        
       const savedIniciativa = await newIniciativa.save();

       if(savedIniciativa){
       res.status(201).send({
        "message": "Nota criada com sucesso",   
        savedIniciativa
        })
        }

        } catch (err) {
        console.error(err)
        }
}

const updateIniciativa = async (req, res) =>{
    try {
       
        const findIniciativa = await iniciativaSchema.findById(req.params.id)

        if (!findIniciativa) {
            res.status(404).send({
                "message": "Iniciativa não encontrada",
                "statusCode": 404
            })
        }

        findIniciativa.name = req.body.name || findIniciativa.name
        findIniciativa.city = req.body.city || findIniciativa.city
        findIniciativa.themes = req.body.themes || findIniciativa.themes
        findIniciativa.description = req.body.description || findIniciativa.description
        findIniciativa.site = req.body.site || findIniciativa.site
        findIniciativa.national = req.body.national || findIniciativa.national

        const savedIniciativa = await findIniciativa.save()
        
        res.status(200).send({
            "message": "Iniciativa atualizada com suceso",
            savedIniciativa
        })

    } catch (error) {
         console.error(error)
    }
}

const deleteById = async (req, res) => {
    try {
   
    const findIniciativa = await iniciativaSchema.findByIdAndDelete(req.params.id)
    res.status(200).send({
        message: "Iniciativa deletada com sucesso.",
        findIniciativa
    })

    if(!findIniciativa){
        res.status(404).send({
            "message": "Iniciativa não encontrada",
            "statusCode": 404
        })
    }

    } catch (error) {
        console.error(error)
    }
}


module.exports = {
    getAll,
    // findById,
    // findByName,
    // findByTemas,
    createIniciativa,
    updateIniciativa,
    deleteById
}