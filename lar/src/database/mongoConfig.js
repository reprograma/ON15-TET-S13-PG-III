const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://keylaReprograma:wgaAW6MCqwTrF8P@cluster0.1eldj.mongodb.net/semana12?retryWrites=true&w=majority";

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