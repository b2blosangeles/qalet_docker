console.log(__dirname);
console.log('Run admin at : ' + new Data());
require('child_process');
process.exit(-1);

console.log('End admin at : ' + new Data());
/*
var CP = new pkg.crowdProcess(),_f = {}; 
    _f['checkUpdate'] = function(cbk) {
      var cmd = "cd /var/qalet/master/setup && " +
      " if [ $(git rev-parse HEAD) = $(git ls-remote $(git rev-parse --abbrev-ref) | head -n1 | cut -f1) ]; then echo 'updated' ; else echo 'changed' ; fi"
      exec(cmd, 
           {maxBuffer: 1024 * 2048},
           function(error, stdout, stderr) {
        let status = stdout.replace(/\r?\n|\r/g, '');
        if (status == 'updated') CP.exit = 1;
        cbk(status);
      });
    }
    _f['gitPull'] = function(cbk) {
      var cmd = "cd /var/qalet/master/setup && " +
      " if [ $(git rev-parse HEAD) = $(git ls-remote $(git rev-parse --abbrev-ref) | head -n1 | cut -f1) ]; then echo 'updated' ; else echo 'changed' ; fi"
      exec(cmd, 
           {maxBuffer: 1024 * 2048},
           function(error, stdout, stderr) {
        cbk(stdout.replace(/\r?\n|\r/g, ''));
      });
    }
    CP.serial(
      _f,
      function(data) {
          res.send(data);
        },
        6000
    );
 */   
