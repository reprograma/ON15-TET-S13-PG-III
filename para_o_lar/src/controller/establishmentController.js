const establishmentSchema = require('../models/establishmentSchema')

const getAll = async (request, response) => {
    try {
        const allEstablishment = await establishmentSchema.find();
        response.status(200).send(allEstablishment);
    } catch(error) {
        console.error(error)

    }
   
}; 

const createEstablishment = async (request, response) => {
    // const { nome, title } = request.body;
    try {

        if(!request.body.nome || !request.body.telefone  || !request.body.pagamento || !request.body.site) {
            response.status(404).send({
               "message": "Os campos obrigatórios precisam ser enviados",
               "statusCode": 404
            })
       }

        const newEstablishment= new establishmentSchema ({
            // _id: new mongoose.Schema.Types.ObjectId,
            nome: request.body.nome,
            endereco: request.body.endereco,
            numero: request.body.numero,
            bairro: request.body.bairro,
            telefone: request.body.telefone,
            pagamento: request.body.pagamento,
            site: request.body.site
            
        });
        
        console.log('NOVA ESTABELECIMENTO', newEstablishment);

        const savedEstablishment = await newEstablishment.save();
        
        if(savedEstablishment){
            response.status(201).json({
                'message': 'Nota criada com sucesso',
                savedEstablishment
            })

        }
        
    } catch(error) {
        console.error('erro:', error)

    }
   
}

module.exports = {
    getAll,
    createEstablishment
 
}