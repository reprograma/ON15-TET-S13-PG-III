const AlbumSchema = require("../models/albumSchema")
const ArtistSchema = require("../models/artistSchema")

// const createArtist = async (request, response) => {
//     try {
    
//     const albums = request.body.albums
//     const artistName = request.body._id

//     const artist = await ArtistSchema.create({ artistName })
    
//     // if(albums) {
//     //     await Promise.all(albums.map(async album => {
 
//     //         const artistWithalbum = new AlbumSchema({ ...album, artist: artist._id})
                      
//     //         await artistWithalbum.save()

//     //         artist.albums.push(artistWithalbum)
     
//     //     }))
//     // }
//     await artist.save()
//     response.status(201).json(artist)


//     } catch(error) {
//         response.status(500).json({message: error.message})
//     }
// }
const createArtist = async (request, response) => {
    try {
        const {artist, birthName, members, birthday, city, genre, bio, albums, alive, image} = request.body

        const newArtist  = new ArtistSchema ({
            artist,
            birthName,
            members,
            birthday,
            city,
            genre,
            bio,
            albums,
            alive,
            image
        })

        const savedNewArtist = await newArtist.save()

        if(savedNewArtist) {
            response.status(201).json({
                "message": "Album criado com sucesso",
                savedNewArtist
            })
        }
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}


const getAllArtist = async (request, response) => {
    try {
        const findAllArtist = await ArtistSchema.find().populate("albums")
        response.status(200).json({
            "Artistas cadastrados": findAllArtist
        })

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const getById = async (request, response) => {
    try {
        const idRequest = request.params.id
        await ArtistSchema.findById(idRequest).populate("albums").exec((error, artist) => {
            if (error) {
              response.status(400).json({ 
                message: "Id inválido.",
                details: error.message })
            } else if (artist == null) {
              response.status(404).json({ message: "Id não encontrado na base de dados"})
            } else {
              response.status(200).json(artist)
            }
          })
        
    } catch(error) {
        response.status(500).json({ message: error.message })
    }
}

const getByName = async (request, response) => {
    const { artist } = request.query
    try {        
        let artistFound = await ArtistSchema.find().populate("albums")

        if(artist) {
            artistFound = await ArtistSchema.find({ artist: { $regex: artist, $options: 'i' }}).populate("albums")
        }

        if (artistFound.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi encontrado nenhum artista com o dado inserido"                
            }
        }

        response.status(200).json(artistFound)
        
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
            genreFound = await ArtistSchema.find({ genre: { $regex: genre, $options: 'i' }}).populate("albums")
        }

        if (genreFound.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi encontrado nenhum artista com o gênero inserido"                
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

const updateArtist = async  (request, response) => {
    try {
        const artistFound = await ArtistSchema.findById(request.params.id)
        
        if(!artistFound){
            response.status(404).send({
                statusCode: 404,
                message: "Artista não encontrado"                
            })
        }
        
        artistFound.artist = request.body.artist || artistFound.artist 
        artistFound.birthName = request.body.birthName || artistFound.birthName
        artistFound.members = request.body.members || artistFound.members
        artistFound.birthday = request.body.birthday || artistFound.birthday
        artistFound.city = request.body.city || artistFound.city
        artistFound.genre = request.body.genre || artistFound.genre
        artistFound.bio = request.body.bio || artistFound.bio
        artistFound.albums = request.body.albums || artistFound.albums
        artistFound.alive = request.body.alive || artistFound.alive
        artistFound.image = request.body.image || artistFound.image


        const savedArtist = await artistFound.save()
        response.status(200).json({
            "O Artista foi atualizado com sucesso": savedArtist
        })

    } catch(error) {
        response.status(500).json({ message: error.message })
    }
}

const deleteArtist = async (request, response) => {
    try {
        const deleteArtist = await ArtistSchema.findByIdAndDelete(request.params.id)

        response.status(200).json({
            "O Artista foi deletado com sucesso": deleteArtist
        })

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

module.exports = {
    createArtist,
    getAllArtist,
    getById,
    getByName,
    getBygenre,
    updateArtist,
    deleteArtist
}