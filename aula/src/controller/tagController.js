const TagSchema = require("../models/tagSchema");
const NoteSchema = require("../models/noteSchema");

const getAll = async (req, res) => {
    try {
        const allTags = await TagSchema.find();
        res.status(200).send(allTags);
    } catch(err) {
        console.error(err)
    }
};

const getTagByColor = async (req, res) => {
    const colorRequested = req.query.color;
    console.log(colorRequested)

    const tagByColor = await TagSchema.find(
        { colors: { $eq: "blue" } }
    );
    
    res.status(200).send(tagByColor)
};

const createTag = async (req, res) => {
    try {
        // acessar informação das notas que vem do body
        const notes = req.body.notes;
        // acessar informação do nome da tag que vem do body
        const name = req.body.name;

        // montar o esqueleto básico da tag
        const tag = await TagSchema.create({ name });

        // se vierem notas no body (já que pra criação de uma tag não é necessário ter notas)
        if(notes) {
            // espera cada promise rodar para cadastrar cada nota
            await Promise.all(notes.map(async note => {
                // monta o esqueleto básico da nota, vinculando ccom o id da tag
                const noteWithTag = new NoteSchema({ ...note, tag: tag._id});
    
                // salvar a nota na collection de nota
                await noteWithTag.save();
    
                // adiciona a nova nota ao objeto de tag
                tag.notes.push(noteWithTag);
            }));
        }
        
        // salva uma tag na collection de tags
        await tag.save();

        // retorna resposta da tag criada
        return res.send({ tag });
    } catch(e) {
        console.error(e)
    }
};


module.exports = {
    getAll,
    createTag,
    getTagByColor
}