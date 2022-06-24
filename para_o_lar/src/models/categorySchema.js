const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    business: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
        }
    ]
});

module.exports = mongoose.model('category', categorySchema);