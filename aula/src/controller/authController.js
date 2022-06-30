const noteSchema = require('../models/noteSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const login = (req, res) => {
    try {
        // UserSchema.findOne(filtro é o email do usuario, função anonima) essas são os parâmetros
        noteSchema.findOne({ author: req.body.author }, (error, user) => {
            if(!note) {
                return res.status(401).send({
                    message: "Nota não encontrado",
                    email: `${req.body.author}`
                })
            }
           
            const validPassword = bcrypt.compareSync(req.body.password, note.password);
            
            if(!validPassword) {
                return res.status(401).send({
                    "message": "Login não autorizado"
                })
              };
            // jwt.sign(recebe dois, parâmetros)
            //jwt.sign(nome do usuário, SECRET)
            //aí guardamos isso numa const chamada de token
            const token = jwt.sign({ author: note.author }, SECRET);
            
            res.status(200).send({
                "message": "Login autorizado",
                token
            });
        
        });
        
    } catch (error) {
        console.error(error)
    };
};

module.exports = {
    login
};