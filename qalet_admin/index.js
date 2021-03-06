var express = require('express');
var app = express();
var ECT = require('ect');
var bodyParser = require('body-parser');
var path = require('path');

var pkg = {
       tpl : ECT({ watch: true, cache: false, root: __dirname + '/views', ext : '.ect' }),
       crowdProcess : require(__dirname + '/vendor/crowdProcess/crowdProcess.js'),
       exec : require('child_process').exec,
       fs   : require('fs')
}
var env = {
       root       : path.join(__dirname, '..'),
       adminFolder         : __dirname,
       idx           : 0
}
// app.set('view engine', 'ect');
app.engine('ect', pkg.tpl.render);

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies   
  extended: true
})); 

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
         res.render('html/page404.ect');
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
         res.render('html/page404.ect');
    }
    return true;
});

app.listen(80);
console.log('Listening on port 80');
