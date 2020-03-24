var express = require('express');
var app = express();
var ECT = require('ect');

var pkg = {
       tpl : ECT({ watch: true, root: __dirname + '/tpls', ext : '.ect' })
}
var env = {
       root   : __dirname,
       idx    : 0
}
// app.set('view engine', 'ect');
app.engine('ect', ECT({ watch: true, root: __dirname + '/views', ext : '.ect' }).render);

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
           var R = new router(env, pkg, req, res);  
           R.get();
    } catch(err) {
         res.render('page404.ect');
    }
    return true;
});

app.post(/(.+)$/i, function (req, res){
   try {
           delete require.cache[__dirname + '/modules/appRouter.js'];
           var router  = require(__dirname + '/modules/appRouter.js');
           var R = new router(env, pkg, req, res);  
           R.post();
    } catch(err) {
         res.render('page404.ect');
    }
    return true;
});

app.listen(80);
console.log('Listening on port 80');
