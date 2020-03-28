var ECT = require('ect');
var env = { rootPath : '/var/qalet', adminPath: '/var/qalet/admin'}
var pkg = {
       tpl           : ECT({ watch: true, root: env.adminPath + '/views', ext : '.ect' }),
       crowdProcess  : require(env.adminPath + '/vendor/crowdProcess/crowdProcess.js'),
       exec          : require('child_process').exec
}

console.log(__dirname);
console.log('Run admin at : ' + new Date());
// require('child_process');
// process.exit(-1);

console.log('End admin at : ' + new Date());

var CP = new pkg.crowdProcess(),_f = {}; 
    _f['checkUpdate'] = function(cbk) {
      var cmd = "cd " + env.rootPath + "/master/setup && " +
      " if [ $(git rev-parse HEAD) = $(git ls-remote $(git rev-parse --abbrev-ref) | head -n1 | cut -f1) ]; then echo 'updated' ; else echo 'changed' ; fi"
      pkg.exec(cmd, 
           {maxBuffer: 1024 * 2048},
           function(error, stdout, stderr) {
              let status = stdout.replace(/\r?\n|\r/g, '');
           //   if (status == 'updated') CP.exit = 1;
              cbk(status);
      });
    }

    _f['gitPull'] = function(cbk) {
           var qaletFolderSetup= env.rootPath + "/master/setup";
           var qaletFolderAdmin= env.rootPath + "/admin";
           var qaletFolderProxy= env.rootPath + "/proxy";
           var cmd = "cd " + qaletFolderSetup + " && git pull && " + 
               "cp -rf " + qaletFolderSetup + "/qalet_admin/. " + qaletFolderAdmin + "/ && rm -fr "+ qaletFolderAdmin + "/Dockerfile &&" +
               "cp -rf " + qaletFolderSetup + "/docker-httpd-reverseproxy/. " + qaletFolderProxy +"/ && rm -fr "+ qaletFolderProxy + "/Dockerfile";
    //  cbk(cmd);
    //       return true;
      pkg.exec(cmd, 
           {maxBuffer: 1024 * 2048},
           function(error, stdout, stderr) {
             let status = stdout.replace(/\r?\n|\r/g, '');
             cbk(cmd);
             // cbk(status);
      });
    }
    CP.serial(
      _f,
      function(data) {
          console.log(data);
        },
        55000
    );
  
