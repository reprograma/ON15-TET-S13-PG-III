const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    notes: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "note"
        }
    ]
});


router.get("/all", controller.getAll);

router.get("/color", controller.getTagByColor);

router.post("/create", controller.createTag);

module.exports = mongoose.model('tag', tagSchema);
