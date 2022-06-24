const CampanhaSchema = require("../models/campanhasModel");
const IniciativaSchema = require("../models/iniciativasModel");

const getAll = async (req, res) => {
    try {
        const allCampanhas = await CampanhaSchema.find();
        res.status(200).send(allCampanhas)
    } catch (error) {
        console.error(err)
    }
};

const getByName = async (req, res) => {
    try {
        const nameRequested =req.query.name;

        const campanhaByName = await IniciativaSchema.find(
            { themes: {$regex: nameRequested, $options: 'i'}}
        );
        res.status(200).send(campanhaByName)
    } catch (error) {
        console.error(error)
    }
};

const createCampanha = async (req, res) => {
    try {
    const iniciativas = req.body.inciativas;

    const name = req.body.name

    const campanha = await CampanhaSchema.create( {name} );

    if(iniciativas) {
        await Promise.all(iniciativas.map(async campanha => {
              const iniciativaWithCampanha = new CampanhaSchema({ ...name, description, campanha: campanha._id});
              
              await iniciativaWithCampanha.save();

              campanha.iniciativa.push(iniciativaWithCampanha);
        }));

        await campanha.save();

    }
        await campanha.save();

        return res.send({ campanha });
    } catch(error) {
    console.error(error)
    }
};

module.exports = {
    getAll,
    getByName,
    createCampanha
}
