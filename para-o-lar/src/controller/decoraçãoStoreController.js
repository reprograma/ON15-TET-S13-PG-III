const decoraçãoStore = require('../models/decoraçãoStoreSchema')

const getAll = async (request, response) => {

    try {
        const allStore = await decoraçãoStore.find();
        response.status(200).send(allStore);

    } catch(err) {
       console.error(err)
    };
};

const createStore = async (request, response) => {
   
    try {
       
        const newStore = new decoraçãoStore ({
            
            nome: request.body.nome,
            endereço: request.body.endereço,
            número: request.body.número,
            bairro: request.body.bairro,
            cidade: request.body.cidade,
            telefone: request.body.telefone,
            pagamento: request.body.pagamento,
            site: request.body.site,
            createdAt: new Date()
            
})
    const saveStore = await newStore.save()
      response.status(201).json({
            "mensagem": "Loja cadastrada com sucesso!",
            saveStore
        })

    } catch (error) {
        response.status(500).json({ message: error.message })   
    }
}

const updateStore = async (request, response) => {

    try {
        
        const findStore = await decoraçãoStore.findById(request.params.id)
        if(!findStore){
            response.status(404).send({
                "message": "Loja não encontrada",
                "statusCode": 404
            })
        }

        findStore.nome = request.body.nome || findStore.nome
        findStore.endereço = request.body.endereço || findStore.endereço

        
        const savedStore = await findStore.save()

    
        response.status(200).send({
            "message": "Loja atualizada com sucesso",
            savedStore
        })

    } catch(err) {
        console.error(err)
    }
   
};

const deleteStore = async (request, response) => {

    try {

        const deletedStore = await decoraçãoStore.findByIdAndDelete(request.params.id)

        response.status(200).send({
            "message": "Loja deletada com sucesso",
            deletedStore
        })
    } catch(err) {
        console.error(err);
    };
};

module.exports = {
    getAll,
    createStore,
    updateStore,
    deleteStore
};

