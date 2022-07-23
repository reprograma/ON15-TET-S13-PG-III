const AlunosSchema = require("../models/AlunosModel");
const IniciativaSchema = require("../models/iniciativasModel");

const getAll = async (req, res) => {
    try {
        const allAlunos = await AlunosSchema.find();
        res.status(200).send(allAlunos)
    } catch (error) {
        console.error(err)
    }
};

const getByName = async (req, res) => {
    try {
        const nameRequested =req.query.name;

        const AlunoByName = await IniciativaSchema.find(
            { themes: {$regex: nameRequested, $options: 'i'}}
        );
        res.status(200).send(AlunoByName)
    } catch (error) {
        console.error(error)
    }
};

const createAluno = async (req, res) => {
    try {
    const iniciativas = req.body.inciativas;

    const name = req.body.name

    const aluno = await AlunosSchema.create( {name} );

    if(iniciativas) {
        await Promise.all(iniciativas.map(async aluno => {
              const iniciativaWithaluno = new AlunosSchema({ ...name, description, aluno: aluno._id});

              await iniciativaWithaluno.save();

              aluno.iniciativa.push(iniciativaWithaluno);
        }));

        await aluno.save();

    }
        await aluno.save();

        return res.send({ aluno });
    } catch(error) {
    console.error(error)
    }
};

module.exports = {
    getAll,
    getByName,
    createAluno
}