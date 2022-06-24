const FeiraSchema = require("../models/feiraSchema");

const getAll = async (req, res) => {
    try {
        const allBusiness = await FeiraSchema.find();
        res.status(200).send(allBusiness);
    } catch(err) {
        console.error(err)
    };
};

const registerBusiness = async (req, res) => {
         try {
             if(!req.body.name || !req.body.category) {
                  res.status(404).send({
                     "message": "Os campos obrigatórios precisam ser enviados",
                     "statusCode": 404
                  })
             }
    
             const newBusiness = new FeiraSchema({
                name: req.body.name,
                category: req.body.category,
                instagram: req.body.instagram,
                createdAt: new Date()
             });
    
             const savedBusiness = await newBusiness.save();
    
             if(savedBusiness) {
                 res.status(201).send({
                     "message": "Negócio cadastrado com sucesso",
                     savedBusiness
                 })
             }
         } catch(err) {
             console.error(err);
         }
    };

const updateBusiness = async (req, res) => {
    try {
        const findBusiness = await FeiraSchema.findById(req.params.id)
        console.log("NEGÓCIO ENCONTRADO", findBusiness);

        if(!findBusiness){
            res.status(404).send({
                "message": "Negócio não encontrado",
                "statusCode": 404
            })
        }

        findBusiness.name = req.body.name || findBusiness.name
        findBusiness.category = req.body.category || findBusiness.category
        findBusiness.instagram = req.body.instagram || findBusiness.instagram

        const savedBusiness = await findBusiness.save()

        res.status(200).send({
            "message": "Negócio atualizado com sucesso",
            savedBusiness
        })

    } catch(err) {
        console.error(err)
    };   
};

const deleteBusiness = async (req,res) => {
    try {
        const deletedBusiness = await FeiraSchema.findByIdAndDelete(req.params.id)

        res.status(200).send({
            "message": "Nota deletada com sucesso",
            deletedBusiness
        })
    } catch(err) {
        console.error(err);
    };
};

module.exports = {
    getAll,
    registerBusiness,
    updateBusiness,
    deleteBusiness
};