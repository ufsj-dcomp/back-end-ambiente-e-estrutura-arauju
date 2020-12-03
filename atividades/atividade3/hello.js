var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Aplicativo Exemplo!');
});

app.get('/html', function(req, res){
    res.send('Lista 03 - Tecnologias Web');
});

app.post('/imagens', function(req, res){
    res.send('Imagem 1 - Imagem 2 - Imagem 3');
});

app.delete('/clientes/10', function(req, res){
    res.send('Cliente numero 10 removido com sucesso');
});

app.listen(3000, function() {
    console.log('Example app listen on port 3000!');
});
