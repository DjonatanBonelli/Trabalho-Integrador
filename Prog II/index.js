const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// Define a pasta de onde os arquivos estáticos serão servidos
app.use(express.static('public'));

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
/* 

http://localhost:3000

*/
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    });

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  req.send()
})