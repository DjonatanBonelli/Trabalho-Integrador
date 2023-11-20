const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const pgp = require("pg-promise")({});  
app.use(cors());
app.use(express.json());

const usuario = "postgres";
const senha = "postgres";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/comercio`);

// Define a pasta de onde os arquivos estáticos serão servidos
app.use(express.static('public'));
app.use(bodyParser.json());

// Inicia o servidor
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
/* 

http://localhost:3000

*/

// **ROTAS**
 
app.get("/", (req, res) => {
  res.send("Hello world");
});



app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", async (req, res) => {
  try{

    const cursos = await db.any("SELECT * FROM adm;");
    console.log('Retornando dados do adm.');
    res.json(cursos).status(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(400);
}
})

app.post("/produto", async (req, res) => {
  try {
      const produtoNome = req.body.nome;
      const produtoValor = req.body.valor;
      console.log(`Nome: ${produtoNome} - Valor: ${produtoValor}`);
      db.none(
          "INSERT INTO produto (nome, valor) VALUES ($1, $2);",
          [produtoNome, produtoValor]
      );
      res.sendStatus(200);
  } catch (error) {
      console.log(error);
      res.sendStatus(400);
  }
});

app.get("/vendas-lista", async (req, res) => {
  try {
      const vendas = await db.any(
          "SELECT to_char(v.dtcompra, 'dd/mm/yyyy') as dtcompra, c.nome, to_char(v.hrcompra, 'hh:mi:ss') as hrcompra, v.metpag, v.valor FROM venda v join clientef c on v.cpfcli = c.cpf order by dtcompra, hrcompra desc limit 5;",
      );
      
      res.json(vendas).status(200);
  } catch (error) {
      console.log(error);
      res.sendStatus(400);
  }
});

app.get("/vendas-geral", async (req, res) => {
  try {
      const vendas = await db.one(
         "SELECT to_char(v.dtcompra, 'dd Month, yyyy') as data, round(cast(sum(v.valor) as numeric), 2) as sum FROM venda v WHERE v.dtcompra = CURRENT_DATE group by data;",
      );
      res.json(vendas).status(200);
  } catch (error) {
      console.log(error);
      res.sendStatus(400);
  }
});

app.get("/vendas-horas", async (req, res) => {
  try {
      const vendas = await db.any(
         "SELECT to_char(v.hrcompra, 'hh:mi') as time, round(cast(v.valor as numeric), 2) as amount FROM venda v WHERE v.dtcompra = CURRENT_DATE;",
      );
      res.json(vendas).status(200);
  } catch (error) {
      console.log(error);
      res.sendStatus(400);
  }
});