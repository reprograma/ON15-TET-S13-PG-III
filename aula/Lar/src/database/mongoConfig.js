const mongoose = require("mongoose");

const MONGODB_URI= "mongodb+srv://Rbtc89:Ubir4t4n@rbtc89pc.hmshx.mongodb.net/Aula12?retryWrites=true&w=majority";
const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Banco conectado!");
  } catch (error) {
    console.log(error.message);
  }
}


module.exports = {
  connect
}