const app = require('./src/app');
const PORT = process.env.PORT;
// 3000, 3030, 6000, 6060, 8000, 8080

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));