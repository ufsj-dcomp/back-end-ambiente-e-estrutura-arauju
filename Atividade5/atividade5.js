var express = require('express');
var app = express();

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "tecweb",
  password: "tecweb",
  database: "tecweb"
})

app.use(express.json());

app.post('/candidato', function(req, res){
    var candidato = req.body;
    console.log("POST - Candidato")

    connection.query("INSERT INTO candidato SET ?", [candidato], (err, result) => {

      if (err){
        console.log(err);
        resp.status(500).end();
      } else {
        resp.status(200).end();
        resp.json(result).end();
      }
    });
});

app.get('/candidato/:candidatoId', function(req, res){
    var candidatoId = req.params.candidatoId;
    console.log("GET - CandidatoId" + candidatoId);

    connection.query("SELECT * FROM candidato WHERE id = ?", [candidatoId], (err, result) => {

      if (err){
        console.log(err).end();
        resp.status(500).end();
      } else {
        resp.status(200).end();
        resp.json(result).end();
      }
    });
});

app.put('/candidato/:candidatoId', function(req, res){
    var candidatoId = req.params.candidatoId;
    console.log("PUT - CandidatoId" + candidatoId);

    connection.query("UPDATE candidato SET ? WHERE id = ?", [candidato, candidatoId], (err, result) => {
      if (err){
        console.log(err);
        resp.status(500).end();
      } else {
        resp.status(200).end();
        resp.json(result).end();
      }
    });
});

app.delete('/candidato/:candidatoId', function(req, res){
    var candidatoId = req.params.candidatoId;
    console.log("DELETE - CandidatoId" + candidatoId);

    connection.query("DELETE FROM candidato WHERE ID = ?", [candidatoId], (err, result) => {

      if (err){
        console.log(err);
        resp.status(500).end();
      } else {
        resp.status(200).end();
        resp.json(result).end();
      }
    });
});

app.listen(3000, function() {
    console.log('App listen on port 3000!');
});
