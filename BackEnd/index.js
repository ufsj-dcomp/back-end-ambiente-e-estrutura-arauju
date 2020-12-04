var express = require('express');
var cors = require('cors');
var app = express();
var mysql = require("mysql");
const bodyParser = require('body-parser');
var jwt = require ('jsonwebtoken');

var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "tecweb"
});

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.post('/auth', (req, resp) => {
  var user = req.body;
  connection.query("SELECT * FROM usuario WHERE nome = ? and senha = ?", [user.nome, user.senha], (err, result) => {
    var usuario = result[0];
    if(result.lenght == 0){
      resp.status(401);
      resp.send({token: null, usuario: usuario, success: false});
    } else {
      let token = jwt.sign({id: usuario.nome}, 'tecweb', {expiresIn: 6000});
      resp.status(200);
      resp.send({token: token, usuario: usuario, success: true});
    }
  });
});

verifica_token = (req, resp, next) => {
  var token = req.headers['x-acess-token'];

  if(!token) {
    resp.status(401);
  }
  jwt.verify(token, 'tecweb', (err, docoded) => {

    req.usuario = decoded.id;
    next();
  });
}

app.get("/candidato", verifica_token, (req, resp) => {
    var candidatoId = req.params.candidatoId;
    console.log("GET - Candidato ");

    connection.query("SELECT * FROM candidato", (err, result) => {
      console.log(err, result);
       resp.send(result);
    }) .on('error', function(err){
      console.log("[mysql error]", err);
  });
});

app.post('/candidato', verifica_token, function(req, resp){
    var candidato = req.body;
    console.log("POST - Candidato");
    connection.query("INSERT INTO candidato SET ?", [candidato], (err, result) => {
        console.log(err, result);
         resp.send(result);
      }) .on('error', function(err){
        console.log("[mysql error]", err);
    });
    //connection.end();
    //res.render("/candidato");
});

app.get("/candidato/:candidatoId", verifica_token, (req, resp) => {
    var candidatoId = req.params.candidatoId;
    console.log("GET - CandidatoId " + candidatoId);

    connection.query("SELECT * FROM candidato WHERE id = ?", [candidatoId], (err, result) => {
      console.log(err, result);
       resp.send(result);
    }) .on('error', function(err){
      console.log("[mysql error]", err);
  });
});

app.put('/candidato/:candidatoId', verifica_token, (req, resp) =>{
    var candidato = req.body;
    var candidatoId = req.params.candidatoId;
    console.log("PUT - CandidatoId " + candidatoId);

    connection.query("UPDATE candidato SET ? WHERE id = ?", [candidato, candidatoId], (err, result) => {
      console.log(err, result);
       resp.send(result);
    }) .on('error', function(err){
      console.log("[mysql error]", err);
  });
});

app.delete('/candidato/:candidatoId', verifica_token, (req, resp) =>{
    var candidatoId = req.params.candidatoId;
    console.log("DELETE - CandidatoId " + candidatoId);

    connection.query("DELETE FROM candidato WHERE id = ?", [candidatoId], (err, result) => {
      console.log(err, result);
       resp.send(result);
    }) .on('error', function(err){
      console.log("[mysql error]", err);
  });
});

app.listen(3000, function() {
    console.log('App listen on port 3000!');
});
