const IniciativaSchema = require("../models/iniciativasModel");
const CampanhaSchema = require("../models/campanhasModel");

const getAll = async (req, res) => {
    try {
        const allIniciativas = await IniciativaSchema.find();
        res.status(200).json({
        "message": "Essas são todas as iniciativas cadastradas:",
        allIniciativas
    })
    } catch (err) {
        console.error(err)
     }
};

const getIniciativasWithCampanhas = async (req, res) => {
    const allIniciativas = await IniciativaSchema.find(
        { tag: { $exists: true } }
    );

    res.status.send(200).send(allIniciativas)
};

const findById = async (req, res) => {
    try {
        const iniciativaById = await IniciativaSchema.findById(req.params.id)

        if (!iniciativaById) {
            throw new Error ("Id não encontrado.")
        }
        return res.status(200).json({
            "message": "Inciativa encontrada com sucesso",
            iniciativaById
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}


const findByName = async (req, res) => {
    try {
        const name = req.query.name
        const iniciativaByName = await IniciativaSchema.find({name: {$regex : name, $options: 'i'}})
            
        if (!iniciativaByName) {
            throw new Error ("Nome não encontrado.")
        }
            

        res.status(200).json({
            "message": "Iniciativa encontrada",
            iniciativaByName
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const findByThemes = async (req, res) => {
    try {
        const themes = req.query.themes
        const findTemas = await IniciativaSchema.find({themes: {$regex: themes, $options: 'i'}})
            
        
        if (findTemas.length == 0) {
            throw new Error ("Tema não encontrado.")
        }

        res.status(200).json({
            "message": "Iniciativas encontradas por temas",
            findTemas
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
// Criar iniciativa sem campanha
// const createIniciativa = async (req, res) => {
//     try {
//         if(!req.body.name || !req.body.city) {
//             res.status(404).send({
//                 "message": "Os campos obrigatórios precisam ser enviados",
//                 "statusCode": 404
//             })

//         }
        
//         const newIniciativa = new IniciativaSchema ({
//             name: req.body.name,
//             city: req.body.city,
//             themes: req.body.themes,
//             description: req.body.description,
//             site:req.body.site,
//             national: req.body.national,
//             dateCreated: new Date()
//         })

        
//        const savedIniciativa = await newIniciativa.save();

//        if(savedIniciativa){
//        res.status(201).send({
//         "message": "Nota criada com sucesso",   
//         savedIniciativa
//         })
//         }

//         } catch (err) {
//         console.error(err)
//         }
// }

const createIniciativa = async (req, res) => {
   try { 
    const {name, city, themes, description, site, national, campains } = req.body;

    const newIniciativa = await IniciativaSchema.create({name, city, themes, description, site, national});
    
    if(campains) {
        const newCampanha = await CampanhaSchema({ name: campains, iniciativa: newIniciativa});

        await newCampanha.save();

        newIniciativa.campanha = newCampanha._id;
    }

    const savedIniciativa = await newIniciativa.save();

    if(savedIniciativa) {
    res.status(201).send({
        "message": "Iniciativa criada com sucesso",
        savedIniciativa
    })

    }

 } catch(e) {
    console.error(e)
 }
};

const updateIniciativa = async (req, res) =>{
    try {
       
        const findIniciativa = await IniciativaSchema.findById(req.params.id)

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
   
    const findIniciativa = await IniciativaSchema.findByIdAndDelete(req.params.id)
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
    getIniciativasWithCampanhas,
    findById,
    findByName,
    findByThemes,
    createIniciativa,
    updateIniciativa,
    deleteById
}