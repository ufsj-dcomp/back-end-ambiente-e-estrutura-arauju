var express = require('express');
var cors = require('cors');
var app = express();
var mysql = require("mysql");
const bodyParser = require('body-parser');

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

app.get("/candidato", (req, resp) => {
    var candidatoId = req.params.candidatoId;
    console.log("GET - Candidato ");

    connection.query("SELECT * FROM candidato", (err, result) => {
      console.log(err, result);
       resp.send(result);
    }) .on('error', function(err){
      console.log("[mysql error]", err);
  });
});

app.post('/candidato', function(req, resp){
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

app.get("/candidato/:candidatoId", (req, resp) => {
    var candidatoId = req.params.candidatoId;
    console.log("GET - CandidatoId " + candidatoId);

    connection.query("SELECT * FROM candidato WHERE id = ?", [candidatoId], (err, result) => {
      console.log(err, result);
       resp.send(result);
    }) .on('error', function(err){
      console.log("[mysql error]", err);
  });
});

app.put('/candidato/:candidatoId', (req, resp) =>{
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

app.delete('/candidato/:candidatoId', (req, resp) =>{
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
