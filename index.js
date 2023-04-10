const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

//Database
connection
  .authenticate()
  .then(() => {
    console.log("conexão feita com o db");
  })
  .catch((err) => {
    console.log(err);
  });

//Dizendo para o express usar o EJS como engine;
app.set("view engine", "ejs");
app.use(express.static("public"));

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rotas
app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then(
    (perguntas, descricao) => {
      res.render("index", {
        perguntas: perguntas,
        descricao: descricao,
      });
    }
  );
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {});

app.listen(8080, () => {
  console.log("App rodando!");
});
