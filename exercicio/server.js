const alunosJson = require("./alunos.json")

const express = require("express")
const cors = require("cors")


const app = express()
app.use(express.json())
app.use(cors())

const PORT = 8124


app.get("/alunos", (req, res)=>{

res.status(200).json(alunosJson)
})

app.get("/alunos/buscar/:id", (req, res)=>{

const idRequest = req.params.id
const alunoEncontrado = alunosJson.find(aluno => aluno.id == idRequest)
res.status(200).json(alunoEncontrado)
})

app.post("/alunos/cadastrar", (req, res)=>{

const bodyRequest = req.body
const novoAluno = {

    "id": (alunosJson.length)+1,
    "Nome": bodyRequest.Nome,
    "Idade": bodyRequest.Idade,
    "Curso": bodyRequest.Curso
    
}
alunosJson.push(novoAluno)

res.status(201).json(novoAluno)

})

app.delete("/alunos/deletar/:id",(req, res) => {
    const idRequest = req.params.id
    const alunoEncontrado = alunosJson.find(aluno=>aluno.id == idRequest)

 
    const indice = alunosJson.indexOf(alunoEncontrado)

   
    alunosJson.splice(indice, 1)

    res.status(200).json([{
        "mensagem": "Aluno deletado com sucesso",
        "alunoDeletado": alunoEncontrado,

    }])

})

app.put("/alunos/substituir/:id", (req, res) => {
    const idRequest = req.params.id
    const bodyRequest = req.body
    const alunoEncontrado = alunosJson.find(aluno=>aluno.id == idRequest)

    const indice = alunosJson.indexOf(alunoEncontrado)


    bodyRequest.id = idRequest

    alunosJson.splice(indice, 1, bodyRequest)

    res.status(200).json([{
        "mensagem": "Dados do aluno atualizado com sucesso",
        "dadosAtualizados": bodyRequest,
      alunosJson
    }])
})

app.patch("/alunos/updateEstilo/:id", (req, res)=>{
    const idRequest = req.params.id
    const novoAluno = req.body.Curso

    const alunoEncontrado = alunosJson.find(aluno=>aluno.id == idRequest)


    alunoEncontrado.Curso = novoCurso

    res.status(200).json([{
        "mensagem": "Curso atualizado com sucesso",
        "CursoAtualizado": alunoEncontrado,
        alunosJson
    }])

})



app.listen(PORT, ()=>{

console.log(`O servidor está rodando na porta ${PORT}`)

})