#   <div align="center">  **Web API de Serviços com Mongo** </div>

<div align = "center">
    <p>
        Turma Online Todas em Tech - Back-end | Semana 13: Projeto Guiado: revisão <b>CRUD</b>.
    </p>
</div>

<br>

<div align="justify"> 

### Projeto da Semana 13 da {Reprograma}, em que utilizamos um projeto já executado anteriormente com banco de dados simulado e o refatoramos utilizando MONGODB e MONGOOSE. 
</div>

<br>
<div align="justify"> 

Neste projeto utilizo a API da semana 10 do curso, que reune alguns estabelecimentos da Cidade Alta de Olinda/PE que possuem em comum o serviço de bar/restaurante no intuito de unificá-los e torná-los de fácil acesso para quem visita a cidade.

</div>

## 📑 Arquitetura do Projeto

```
├──ON15-TET-S13-PG-III
    ├── para-o-lar           
    │    ├─ src                       
    │    │  ├─ controllers            
    │    │  │  └─ storeController.js  
    │    │  ├─ database               
    │    │  │  └─ moogoConfig.js      
    │    │  ├─ models                 
    │    │  │  └─ storesSchema.js      
    │    │  ├─ routes                 
    │    |  └─ storeRoutes.js      
    |    ├─ app.js 
    |    └─  README.md
    |               
    ├─ .env.example
    ├─ .gitignore
    ├─ package-lock.json         
    ├─ package.json                 
    └─ server.js
```

## ⚙️ Dependências do Projeto
    - Mongoose
    - Cors
    - Express
    - Nodemon

## 💻 Dependências de ambiente
    - Node 
    - Mongodb 

## 📚 Collection

<div> 

A `collection` possui uma coleção onde armazenamos os estabelecimentos com informações úteis para que sirvam de ajuda para turistas e visitantes da cidade.  

</div>

<p>

Exemplo de `Bar` / `Restaurante` cadastrado:

</p>

```json
[
    {
        "_id": "62b220c73bafbeb317d661e9",
        "review": 8.3,
        "store": "Sabor do Bonfim",
        "category": [
            "Restaurante"
        ],
        "neighborhood": "Carmo",
        "address": "R. do Bonfim",
        "number": 66,
        "paymment": [
            "Dinheiro",
            "cartão"
        ],
        "site": "https://sabordobonfimpizzabar.negocio.site/",
        "createdAt": "Tue Jun 21 2022 16:49:27 GMT-0300 (Horário Padrão de Brasília)",
        "updatedAt": "2022-06-23T01:53:37.505Z",
        "__v": 0
    }
]
```


## `{}` Schema

<p> O Schema contém os itens a serem inseridos na criação de novos registros e seu grau de importância/obrigatoriedade.

```javascript
const storeSchema = new mongoose.Schema({
        id: mongoose.Schema.Types.ObjectId,
        review : {
            type: Number
        },
        store: {
            type: String, 
            required: true
        },
        category: {
            type: [String],
            
        },
        neighborhood: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        paymment: {
            type: [String],
            required: true
        },
        site: {
            type: String
        },
        createdAt: {
            type: String,
            default: new Date()
        }
    }

```
##  🛣️ ROTAS

###  Método GET

<div align = "center">

|  Método  |                  Rota                       |                     Descrição                                |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `GET`   | localhost:8080/store/all                    |    Lista de todos os estabelecimentos                        |
|  `GET`   | localhost:8080/store/find_some?store=bar    |        Busca por Estabelecimento ou Bairro                   |
|  `GET`   | localhost:8080/store/id/:id                 |             Busca por ID                                     |


<br>
</div>

### Método POST

<div align = "center">

|  Método  |                  Rota                       |                     Descrição                                |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `POST`  | localhost:8080/store/create                 |    Cria novos registros de estabelecimentos                  |

<br>
</div>

###  Método PUT

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|   `PUT`  |  localhost:8099/livrarias/update/:id        |       Atualizar  os estabelecimentos por ID                  |

<br>
</div>

####  Método DELETE

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
| `DELETE` |  localhost:8099/livrarias/delete/:id        |                      Deletar estabelecimento por ID          |

<br>
</div>

###  INSTALAÇÃO: 

1. Entre na pasta onde você deseja clonar o repositório. Abra o **git** nela e digite: 

    ```bash
    $ git clone https://github.com/elizapimentel/ON15-TET-S13-PG-III
     ```

2. Digite a linha abaixo para entrar na branch correta: 

   ```bash
    $ git checkout Eliza
     ```

3. Digite a linha abaixo para entrar na pasta correta: 

    ```bash
    $ cd para-o-lar/
    ```
    
4. Escreva a seguinte linha para instalar as dependências utilizadas nesse projeto: 

   ```bash
    $ npm install
    ```
5. Inicie o servidor, utilizando a frase: 

   ```bash
    $ npm start
    ```   

<br>

<div align = "justify">

###  TESTE: 

- Importe a coleção para teste deste servidor clicando [aqui](https://www.getpostman.com/collections/1f21215ca22ecc2452f9) !

- Copie o link acima e, no [Postman](https://www.postman.com/downloads/), clique em *Import* -> *Link* (cole o link) -> *Continue* -> *Import*.

- Ou forke diretamente para o seu Postman através do link:<div align = "justify"> [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/20977005-3d6a647b-c374-45a4-85b5-3bdaa4525c93?action=collection%2Ffork&collection-url=entityId%3D20977005-3d6a647b-c374-45a4-85b5-3bdaa4525c93%26entityType%3Dcollection%26workspaceId%3Dfd948d9e-a939-463f-8094-05c2599f2db5) </div>

</div>
