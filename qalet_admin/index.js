var http = require('http');
//create a server object:
http.createServer(function (req, res) {
  res.send(__dirname + '/index.html'); //end the response
}).listen(80); 
