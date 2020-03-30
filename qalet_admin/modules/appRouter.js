(function () { //
	var obj =  function (env, pkg, req, res, io) {
		var fs = require('fs');
		var exec = require('child_process').exec;

		this.send404 = function(v) {
			res.writeHead(404, {'Content-Type': 'text/html'});
			res.write(v + ' does not exist');
			res.end();		
		}	
		this.send500 = function(err) {
			res.writeHead(500, {'Content-Type': 'text/html'});
			res.write('Error! ' + err.message);
			res.end();			
		}
		this.checkCodeUpdate = function() {
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
		}
		this.runScript = function(code) {
			var me = this;
			
			var vhostsCFG = {
				vhosts	: [
					{
						serverName	: 'www.shusiou.win', 
						serverAlias	: 'shusiou.win',
						gitHub		: 'https://github.com/b2blosangeles/docker_apache_php.git',
						innerPort	: 80,
						gatewayIp	: '173.28.5.254',
						gatewayPort: 10080
					},
					{
						serverName	: 'ss1.shusiou.win', 
						gitHub		: 'https://github.com/b2blosangeles/docker_apache_php.git',
						innerPort	: 80,
						gatewayIp	: '173.28.5.254',
						gatewayPort: 10081
					},
					{
						serverName	: 'ss1.shusiou.win', 
						gitHub		: 'https://github.com/b2blosangeles/docker_apache_php.git',
						innerPort	: 80,
						gatewayIp	: '173.28.5.254',
						gatewayPort: 10082
					}
				],
				rootFolder	: '/var/qalet'
			};
	
			// sitesFolder
			let cmd = "mkdir -p /var/qalet/tasks/www.shusiou.win";
			exec(cmd, 
			     {maxBuffer: 1024 * 2048},
			     function(error, stdout, stderr) {
				if (error) {
					res.render('html/page404.ect');
				} else {
					env.idx++;
					
					fs.writeFile('/var/qalet/tasks/www.shusiou.win/out.sh', 
						"echo '" +  env.idx + '_' + new Date().getTime()  + "' >>  /tmp/site_cron.data"    
						, function (err,data) {
						  	if (err) {
							    res.send('ERR 1');
							} else {
							    if (code === 'vhost') {
							    	var str = pkg.tpl.render('tpl/dockerVirturehostProxyConfig.ect', 
											 vhostsCFG); 
							    } else {
								var str = pkg.tpl.render('tpl/dockerVSvrCom.ect', vhostsCFG); 
							    }
							    res.send(str);
							}
						  });
				}	
			});

		}
		
		this.post = function() {
			var me = this, p = req.params[0];
			var patt = new RegExp('/(api|package|cms)/(.+|)', 'i');
			var v = p.match(patt);
			if ((v) && typeof v == 'object') {
				switch (v[1]) {
					case 'api':
						res.render('html/index.ect', { module: "API"});
						break;
					case 'package':
						res.render('html/index.ect', { module: "package"});
						break;
					case 'cms':
						res.render('html/index.ect', { module: "package"});
						break;
					default:
						res.render('html/index.ect', { module: "Others"});
				}		
			} else {
				res.render('html/page404.ect');
			}
		};
		this.get = function() {
			var me = this, p = req.params[0];
			
			var module_code = (p=='/') ? 'Home' : p;
			
			var TPA = {
				"/"	: {
						tpl : "html/index.ect",
						data : {module_code: module_code, module : "Home"}
				},
				"/about": {
						tpl : "html/about.ect",
						data : {module_code: module_code, module : "About"}
					}
			}
			
			var patt = new RegExp('/(checkCodeUpdate|vhost|startup|api|checkip|package|cms)/(.+|)', 'i');
			var v = p.match(patt);
			if ((v) && typeof v == 'object') {
				switch (v[1]) {
					case 'checkCodeUpdate':
						me.checkCodeUpdate();
						break;
					case 'vhost':
						me.runScript(v[1]);
						break;
					case 'startup':
						me.runScript(v[1]);
						break;
					case 'api':
						res.render('html/index.ect', { module: "api 66 get"});
						break;	
					case 'checkip':
						res.render('html/index.ect', { module: "checkip"});
						break;	
					case 'package':
						res.render('html/index.ect', { module: "package"});
						break;
					case 'cms':
						res.render('html/index.ect', { module: "package"});
						break;	
					default:
						res.render('html/index.ect', { module: "Others"});
				}		
			} else {
				if (TPA[req.params[0]]) {
					res.render(TPA[req.params[0]].tpl, TPA[req.params[0]].data);
					return true;
				} else {
					var fn = env.root + '/files' + req.params[0];
					fs.stat(fn, function(err, stat) {
					      if(err == null) {
						  if (stat.isDirectory()) {
							res.sendFile(fn + 'index.html');
						  } else {
							res.sendFile(fn);
						  }
					      } else if(err.code === 'ENOENT') {
						  res.render('html/page404.ect');
					      }
					});
				}
			}
		};	
	};
	
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
