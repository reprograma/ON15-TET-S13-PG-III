#   <div align="center">  *Museus de Recife: Web Api* </div>

<div align = "center">

Turma Online 15 Todas em Tech - Back-End | Semana 13: *Projeto Guiado: CRUD com Banco de Dados*

</div>

<br>

<div align="justify"> 

Foi proposto fazer uma reciclagem de um projeto, com a utilização do Mongo DB, porém quis fazer desse projeto algo novo unindo a minha formação com a tecnologia. Construí uma API que realiza o CRUD (create, read, update, delete) de museus recifenses, utilizando duas collections: uma para os museus e outra para a utilização de tags.

</div>

## 📑 Arquitetura do Projeto

```
├──ON15-TET-S13-PG-III
    ├── projeto-guiado-III           
    │    ├─ src                       
    │    │  ├─ controllers
    │    │  │  ├─ museumController.js             
    │    │  │  └─ tagController.js  
    │    │  ├─ database
    │    │  │  └─ moogoConfig.js      
    │    │  ├─ models
    │    │  │  ├─ museumSchema.js                  
    │    │  │  └─ tagSchema.js      
    │    │  ├─ routes
    │    │  │  ├─ museumRoutes.js                  
    │    |     └─ tagRoutes.js      
    |    └─  app.js 
    ├─ .env.example
    ├─ .gitignore
    ├─ package-lock.json         
    ├─ package.json
    ├─ README.md                 
    └─ server.js
```

## ⚙️ Dependências do Projeto
    - Mongoose
    - Cors
    - Dotenv-safe
    - Express
    - Nodemon

## 💻 Dependências de ambiente
    - Node 
    - Mongodb 

## 📚 Collections

<div> 

A primeira collection, dos *museus*, possui uma coleção na qual são armazenadas as informações do museu para agendar visitação e adicioná-lo no roteiro de viagem.

</div>

<p>

Exemplo de **Museu** cadastrado:

</p>

```json
[
    {
        "_id": "62b673670d26c0c920abb2de",
        "name": "Museu do Homem do Nordeste",
        "description": "É um museu de antropologia, instituição federal, vinculado à Fundação Joaquim Nabuco/Ministério da Educação. Reune acervos que revelam a pluralidade das culturas negras, indigenas e brancas desde nossas origens até os diferentes desdobramentos e misturas",
        "neighborhood": "Casa Forte",
        "address": "Av. Dezessete de Agosto, 2187",
        "phone": [
            "3073-6340",
            "3073-6331"
        ],
        "website": "https://www.instagram.com/museudohomemdonordeste",
        "tickets": [
            "inteira",
            "meia"
        ],
        "createdAt": "Fri Jun 24 2022 23:29:52 GMT-0300 (Horário Padrão de Brasília)",
        "updatedAt": "2022-06-25T02:29:52.000Z",
        "__v": 0
    }
]
```
<div> 

A segunda collection, de *tags*, para adicionar nos museus e categorizar por subtipos a critério do usuário: grátis, temporariamente fechado, acessível.

</div>

<p>

Exemplo de **Tag** cadastrado:

</p>

``` json
[ {
        "_id": "62b677610d26c0c920abb2ec",
        "name": "grátis",
        "museums": [{
            "_id": "62b677b2d75d58a69abd8653",
            "name": "Memorial Chico Science",
            "description": "Este memorial de três salas explora a vida e interesses do cantor e compositor Chico Science.",
            "neighborhood": "São José",
            "address": "R. São Pedro, 21",
            "phone": [
                "3355-3158"
            ],
            "website": "www2.recife.pe.gov.br/servico/memorial-chico-science",
            "tickets": [],
            "createdAt": "Fri Jun 24 2022 23:49:12 GMT-0300 (Horário Padrão de Brasília)",
            "updatedAt": "2022-06-25T02:49:12.000Z",
            "__v": 0
        }],
        "__v": 0
    }
]
```

## `{}` Schemas

<p> Os Schemas contém os itens a serem inseridos na criação de novos registros e seu grau de importância/obrigatoriedade. 
</p>

```javascript
{
        id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    neighborhood: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: [String],
        required: true
    },
    website: {
        type: String
    },
    tickets: {
        type: [String],
        required: true
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag"
    },
    createdAt: {
        type: String,
        default: new Date()
    }
        }
   

```
```javascript
{
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    museums: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "museum"
        }
    ]
}
```
##  🛣️ ROTAS

###  Método GET

<div align = "center">

|  Método  |                  Rota                       |                     Descrição                                |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `GET`   | localhost:PORT/museums/all                    |    Lista de todos os museus                        |
|  `GET`   | localhost:PORT/museums/search    |        Busca museu por nome ou pelo bairro                   |
|  `GET`   | localhost:PORT/museums/with-tags                 |             Busca museu com qualquer tag                                    |
|  `GET`   | localhost:PORT/museums/with-free-tags                 |             Busca museu pela tag "grátis"                                    |
|  `GET`   | localhost:PORT/museums/with-close-tags                 |             Busca museu pela tag "temporariamente fechado"                                    |
|  `GET`   | localhost:PORT/museums/with-accessible-tags                 |             Busca museu pela tag "acessível"                                    |
|  `GET`   | localhost:PORT/tags/all                 |             Lista de todas as tags                                    |


<br>
</div>

### Método POST

<div align = "center">

|  Método  |                  Rota                       |                     Descrição                                |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `POST`  | localhost:PORT/museums/create                 |    Cadastra novos museus                  |
|  `POST`  | localhost:PORT/tags/create                 |    Cadastra novas tags                  |

<br>
</div>

###  Método PUT

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|   `PUT`  |  localhost:PORT/museums/update/:id        |       Atualiza  os museus por ID                  |

<br>
</div>

###  Método DELETE

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
| `DELETE` |  localhost:PORT/museums/delete/:id        |                      Deleta museu por ID          |
| `DELETE` |  localhost:PORT/tags/delete/:id        |                      Deleta tag por ID          |

<br>
</div>