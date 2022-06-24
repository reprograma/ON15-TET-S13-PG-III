# Semana 13 Todas em Tech Reprograma - Projeto Guiado 3

* Olá, aqui é Brena, recebam as boas-vindas. Este repositório corresponde ao exercício da semana 13 do bootcamp Todas em Tech da Reprograma com a professora Paula Allemend.

O objetivo do exercício desta semana era refatorar o projeto guiado 2 adicionando o banco de dados. Ainda seguindo o modelo de uma API modelo MVC com os verbos HTTP, com pelo menos um GET, um POST, um PUT e um DELETE.

O objetivo desta API é atender a iniciativas de sociedade civil e organizações não-governamentais que tenham relação com os temas dos direitos humanos, inclusão de mulheres e apoio a população LGBTQIA+.

Conectei a API ao Mongodb, de forma que seja possível adicionar as iniciativas ao banco em uma collection. Além disso, criei uma segunda collection no banco de dados chamada "campanhas" na qual as iniciativas podem cadastrar campanhas também através de um CREATE. As duas collections estão interligadas por _id.

A API permite que a pessoa usuária busque todas as iniciativas, faça buscas por id (GET), por nome(GET) e por temas(GET), cadastre outras iniciativas(CREATE) e delete iniciativas(DELETE). Também permite que a pessoa usuária cadastre campanhas(CREATE), busque todas as campanhas(GET) e faça buscas por nome(GET). Totalizando 10 rotas na API.

Este projeto contém dois aquivos de routes, dois arquivos de controllers e dois de models (com um Schema em cada), que correspodem as iniciativas e campanhas.

Utilizei: 
* JavaScrip
* NODE JS
* Modelo MVC
* Verbos HTTP
* API restful
* Express
* MONGODB
* NoSQL

Todas as informações utilizadas foram retiradas dos Instagrams e/ou sites oficiais das iniciativas.
