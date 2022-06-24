const FeiraSchema = require("../models/feiraSchema");
const CategorySchema = require("../models/categorySchema")

const getAll = async (req, res) => {
    try {
        const allBusiness = await FeiraSchema.find();
        res.status(200).send(allBusiness);
    } catch(err) {
        console.error(err)
    };
};

// criar nota com tag

const createBusiness = async (req, res) => {
     try {
         // acessar informações do body
         const { name, category, instagram } = req.body;

         // criar o esqueleto da nova nota, sem o id da tag
         const newBusiness = await FeiraSchema.create({ name, instagram });
         console.log("NOVO NEGÓCIO CADASTRADO", newBusiness)

         if(category) {
             // criar o esqueleto da nova tag
             const newCategory = await new CategorySchema({name: category, business: newBusiness});
             console.log("NOVA CATEGORIA A SER SALVA", newCategory)
    
             // salvar a nova tag
             await newCategory.save();
    
             // atribuir o valor de tag dentro de note ao id da nova tag
             newCategory.category = newCategory._id;
         }

         // salvar a nota
         const savedCategory = await newCategory.save();
         console.log("NEGÓCIO SALVO NO BANCO", savedCategory)

         // retornar a nota!
         if(savedCategory) {
             res.status(201).send({
                 "message": "Negócio cadastrado com sucesso",
                 savedCategory
             })
         }
     } catch(e) {
         console.error(e)
     };
};

const updateBusiness = async (req, res) => {
    try {
        // atualizar o documento a partir id
            // receber esse id da requisição
        // encontrar o documento que possui aquele id
        const findBusiness = await FeiraSchema.findById(req.params.id)
        console.log("NEGÓCIO ENCONTRADO", findBusiness);

        if(!findBusiness){
            res.status(404).send({
                "message": "Negócio não encontrado",
                "statusCode": 404
            })
        }

        // confiro as informações atualizadas
        findBusiness.name = req.body.name || findBusiness.name
        findBusiness.category = req.body.category || findBusiness.category
        findBusiness.instagram = req.body.instagram || findBusiness.instagram

        // salvo as atualizações
        const savedBusiness = await findBusiness.save()

        // envio a resposta
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
        // acessar o documento a ser deletado
        // const findNote = await NoteSchema.findById(req.params.id)

        // deletar esse documento
        // await findNote.delete()

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
    createBusiness,
    updateBusiness,
    deleteBusiness
};