const AlbumSchema = require("../models/albumSchema")
// const ArtistSchema = require("../models/artistSchema")

const createAlbum = async (request, response) => {
    try {
        if(!request.body.albumTitle || !request.body.trackList) {
            request.status(404).send({
                 "message": "Os campos obrigatórios precisam ser enviados",
                 "statusCode": 404
            })
        }

        const newAlbum = new AlbumSchema({
            artist: request.body.artist,
            albumTitle: request.body.albumTitle,
            released: request.body.released,
            format: request.body.format,
            trackList: request.body.trackList,
            genre: request.body.genre,
            image: request.body.image
        })
        
        const savedAlbum = await newAlbum.save()
        //console.log(savedAlbum)
        if(savedAlbum) {
            response.status(201).send({
                "message": "Álbum criado com sucesso",
                savedAlbum
            })
        }
     } catch (error) {
        response.status(500).json({message: error.message})
     }
}

const getAllAlbums = async (request, response) => {
    try {
        const findAllAlbums = await AlbumSchema.find()
        response.status(200).json({
            "Álbuns cadastrados": findAllAlbums
        })

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const getById = async (request, response) => {
    try {
        const idRequest = request.params.id
        AlbumSchema.findById(idRequest).exec((error, album) => {
            if (error) {
              response.status(400).json({ 
                message: "Id inválido.",
                details: error.message })
            } else if (album == null) {
              response.status(404).json({ message: "Id não encontrado na base de dados"})
            } else {
              response.status(200).json(album)
            }
          })
        
    } catch(error) {
        response.status(500).json({ message: error.message })
    }
} 

const getByName = async (request, response) => {
    try {
        const name = request.query.name
        const albumFound = await AlbumSchema.find({$or:[
            {artist: { $regex : name, $options: 'i'}},
            {albumTitle: { $regex : name, $options: 'i'}}
        ]})

        if (albumFound.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi encontrado nenhum artista ou álbum com o dado inserido"                
            }
        }

        response.status(200).json(albumFound)
        
    } catch(error) {
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }

    }
}

const getBygenre = async (request, response) => {
    const { genre } = request.query
    try {        

        if(genre) {
            const genreFound = await AlbumSchema.find({ genre: { $regex: genre, $options: 'i' }})
        }

        if (genreFound.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi encontrado nenhum álbum com o gênero inserido"                
            }
        }

        response.status(200).json(genreFound)
        
    } catch(error) {
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }

    }
}

const updateAlbum = async  (request, response) => {
    try {
        const albumFound = await AlbumSchema.findById(request.params.id)
       
        if(!albumFound){
            response.status(404).send({
                statusCode: 404,
                message: "Álbum não encontrado"                
            })
        }
        
        albumFound.artist = request.body.artist || albumFound.artist 
        albumFound.albumTitle = request.body.albumTitle || albumFound.albumTitle
        albumFound.released = request.body.released || albumFound.released
        albumFound.format = request.body.format || albumFound.format
        albumFound.trackList = request.body.trackList || albumFound.trackList
        albumFound.genre = request.body.genre || albumFound.genre
        albumFound.image = request.body.image || albumFound.image


        const savedAlbum = await albumFound.save()
        response.status(200).json({
            "O Álbum foi atualizado com sucesso": savedAlbum
        })

    } catch(error) {
        response.status(500).json({ message: error.message })
    }
}

const deleteAlbum = async (request, response) => {
    try {
        const deleteAlbum = await AlbumSchema.findByIdAndDelete(request.params.id)

        response.status(200).json({
            "O Álbum foi deletado com sucesso": deleteAlbum
        })

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

module.exports = {
    createAlbum,
    getAllAlbums,
    getById,
    getByName,
    getBygenre,
    updateAlbum,
    deleteAlbum
}