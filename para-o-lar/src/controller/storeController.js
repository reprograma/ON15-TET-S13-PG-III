const StoreSchema = require("../models/storesSchema")

const findAll = async(req, res) => {
    try {
        const allStores = await StoreSchema.find()
        
        res.status(200).json(allStores)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

const createStore = async(req, res) => {
    const { review, store, category, neighborhood, address, number, paymment, site } = req.body
    if(!req.body.store || !req.body.address){
        return res.status(404).send({
            "message": "Campo obrigatório",
            "satusCode": 404
        })        
    }
        const storeExists = StoreSchema.find({ store: req.body.store})
    if(storeExists) {
       return res.status(400).send({
            "message": "Estabelecimento já cadastrado"
        })
    }
    try {
        const newStore = new StoreSchema ({ review, store, category, neighborhood, address, number, paymment, site, createdAt: new Date() })        
        const savedStore = await newStore.save()        
        res.status(201).json(savedStore)        
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

const getById = async(req, res) => {
    try {
        await StoreSchema.findById(req.params.id).exec((err, stores) => {
            if (err) {
              return res.status(400).send({ message: `${err.message} - Id informado está fora do padrão.` });
            } else if (stores == null) {
              return res.status(404).send('Id não encontrado na base de dados');
            } else {
              return res.status(200).send(stores);
            }
          })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



module.exports = {
    findAll,
    createStore,
    getById,
    // findSome,
    // updateStore,
    // deleteStore
}