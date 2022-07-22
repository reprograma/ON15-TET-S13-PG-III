const LivroModel = require('../models/livros')

const listarTodos = async (request, response) => {
    try {
      const livro = await LivroModel.find();
      res.status(200).json(livro);
    } catch (error) {
      res.status(500).json({
        messagem: error.message
      });
    }
  }
  
  const listarPorId = async (request, response) => {
    try {
      const livroEncontrado = await LivroModel.findById(req.params.id);
      if(livroEncontrado) {
        res.status(200).json(livroEncontrado);
      }
    } catch (error) {
      res.status(500).json({
        mensagem: error.message
      })
    }
  }
  
  const cadastrarLivro = async (request, response) => {
    try {
      const livro = new LivroModel({
        nome: req.body.nome,
        paginas: req.body.paginas,
        sinopse: req.body.sinopses
      })
    
      const salvarLivro = await livro.save();
      res.status(201).json({
        livro: salvarLivro
      })
    } catch (error) {
      res.status(500).json({
        mensagem: error.message 
      })
    }
  }
  
  
  
  module.exports = {
    listarTodos,
    listarPorId,
    cadastrarLivro
  }