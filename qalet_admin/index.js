var express = require('express');
var fs = require('fs');
var app = express();
var ECT = require('ect');
var ETCEntity = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });
// app.set('view engine', 'ect');
app.engine('ect', ETCEntity.render);

app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
});

app.get(/(.+)$/i, function (req, res){
   try {
           delete require.cache[__dirname + '/modules/appRouter.js'];
           var router  = require(__dirname + '/modules/appRouter.js');
           var R = new router({root : __dirname}, req, res);  
           R.load();
    } catch(err) {
         res.render('page404.ect');
    }


    return true;
});

app.listen(80);
console.log('Listening on port 80');
