var express = require('express');
var fs = require('fs');
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

app.get(/(.+)$/i, function (req, res){
   try {
           delete require.cache[__dirname + '/modules/appRouter.js'];
           var router  = require(__dirname + '/modules/appRouter.js');
           var R = new router({root : __dirname}, req, res);  
           R.load();
    } catch(err) {
         res.render('page404.ect');
    }

       /*
    var fn = __dirname + '/files' + req.params[0];
    fs.stat(fn, function(err, stat) {
      if(err == null) {
          res.sendFile(fn);
      } else if(err.code === 'ENOENT') {
          res.render('page404.ect');
      }
    });*/
    return true;
});



app.listen(80);
console.log('Listening on port 80');
