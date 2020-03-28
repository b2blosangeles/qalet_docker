var ECT = require('ect');
var env = { rootPath : '/var/qalet', adminPath: '/var/qalet/admin', sitesPath : '/var/qalet/sites'}
var pkg = {
       tpl           : ECT({ watch: true, root: env.adminPath + '/views', ext : '.ect' }),
       crowdProcess  : require(env.adminPath + '/vendor/crowdProcess/crowdProcess.js'),
       exec          : require('child_process').exec
}
const fs = require('fs');
fs.readdir(env.sitesPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    var CP = new pkg.crowdProcess(),_f = {}; 
    files.forEach(function (file) {
        _f[file] = function(cbk) {
              var CP0 = new pkg.crowdProcess(),_f0 = {};
              _f0['checkUpdate'] = function(cbk0) {
                    var cmd0 = "cd " + env.sitesPath + "/" + file + " && " +
                    " if [ $(git rev-parse HEAD) = $(git ls-remote $(git rev-parse --abbrev-ref) | head -n1 | cut -f1) ]; then echo 'updated' ; else echo 'changed' ; fi"
                    pkg.exec(cmd0, 
                         {maxBuffer: 1024 * 2048},
                         function(error, stdout, stderr) {
                            let status = stdout.replace(/\r?\n|\r/g, '');
                            if (status == 'updated') CP0.exit = 1;
                            cbk0(status);
                    });
                  }
                  _f0['gitPull'] = function(cb0k) {
                     var cmd0 = "cd " + env.sitesPath + "/" + file + " && git pull";
                     pkg.exec(cmd0, 
                         {maxBuffer: 1024 * 2048},
                         function(error, stdout, stderr) {
                           let status = stdout.replace(/\r?\n|\r/g, '');
                           cbk0(status);
                     });
                  }
                  CP0.serial(
                    _f0,
                    function(data) {
                        cbk(data);
                      },
                      20000
                  );
        }
    });
    CP.serial(
      _f,
      function(data) {
          console.log(data);
        },
        55000
      );
});

console.log(__dirname);
console.log('Run admin at : ' + new Date());
