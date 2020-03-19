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
var ectInty = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });

// app.set('view engine', 'ect');
app.engine('ect', ectInty.render);

app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
});

app.get(/api\/(.+)$/i, function (req, res) {
    res.send('api get');
    return true;
});

app.post(/api\/(.+)$/i, function (req, res) {
    res.send('api post');
    return true;
});

app.get(/\/$/i, function (req, res){
    res.render('index.ect');
    return true;
});

app.get(/(.+)$/i, function (req, res){
    res.send(req.params[0]);
    return true;
});



app.listen(80);
console.log('Listening on port 80');
