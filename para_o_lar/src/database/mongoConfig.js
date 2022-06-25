// const mongoose = require('mongoose')

// const MONGODB_URI = process.env.MONGODB_URI

// const connect = async () => {
//     try { 
        
//         await mongoose.connect(MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//         console.log('banco conectado com sucesso!')
//     } catch(error) {
//         console.error(error)
//     }
// }

// module.exports = { 
//     connect 
// };

// const mongoose = require('mongoose')
const MongoClient = require('mongoose').MongoClient;
// const MONGODB_URI = process.env.MONGODB_URI
var MONGODB_URI = process.env.MONGODB_URI;

const connect = (MONGODB_URI, function (err, connect) {
    if (err) throw err;
    const filme = connect.filme('filme');
    filme.collection('films').aggregate([
        {
            $lookup:
            {
                from: "films",
                localField: "_id",
                foreignField: "_id",
                as: "film_union",
            }
        }
    ]).toArray()
        .then(res => {
            res.forEach(order => console.log(JSON.stringify(order)));
        }).catch(err => {
            console.log("Error: Update unsuccessfull.")
        }).finally(() => {
            connect.close();
        })

});

module.exports = { 
   connect
};