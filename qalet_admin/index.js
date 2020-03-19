/*
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(80);
*/
var express = require('express');
var app = express();
var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });

// app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

app.get('/', function (req, res){
    res.render('index.ect');
});

app.listen(80);
console.log('Listening on port 80');
