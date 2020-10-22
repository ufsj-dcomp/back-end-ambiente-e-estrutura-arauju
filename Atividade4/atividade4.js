var express = require('express');
var app = express();

app.use(express.json());

app.post('/candidato', function(req, res){
    var candidato = req.body;
    console.log(JSON.stringify(candidato))
});

app.get('/candidato/:candidatoId', function(req, res){
    var candidatoId = req.params.candidatoId;
    console.log("GET - CandidatoId" + candidatoId);
});

app.put('/candidato/:candidatoId', function(req, res){
    var candidatoId = req.params.candidatoId;
    console.log("PUT - CandidatoId" + candidatoId);
});

app.delete('/candidato/:candidatoId', function(req, res){
    var candidatoId = req.params.candidatoId;
    console.log("DELETE - CandidatoId" + candidatoId);
});

app.listen(3000, function() {
    console.log('App listen on port 3000!');
});
