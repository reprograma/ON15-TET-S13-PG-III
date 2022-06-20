const storeSchema = new mongoose.Schema({
        id: mongoose.Schema.Types.ObjectId,
        likes : {
            type: Number
        },
        dislikes : {
            type: Number
        },
        store: {
            type: String, 
            required: true
        },
        category: {
            type: [String],
            
        },
        neighborhood: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        paymment: {
            type: [String],
            required: true
        },
        site: {
            type: String
        },
        date: {
            type: Date,
            default: new Date()
        }
    })

    module.exports = mongoose.model('store', storeSchema)