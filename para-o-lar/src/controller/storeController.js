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

module.exports = {
    findAll,
    // createStore,
    // getById,
    // findSome,
    // updateStore,
    // deleteStore
}