(function () { 
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
						res.render('html/index.ect', { module: "API code"});
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
			var patt = new RegExp('/(vhost|startup|api|checkip|package|cms)/(.+|)', 'i');
			var v = p.match(patt);
			if ((v) && typeof v == 'object') {
				switch (v[1]) {
					case 'vhost':
						me.runScript(v[1]);
						break;
					case 'startup':
						me.runScript(v[1]);
						break;
					case 'api':
						res.render('html/index.ect', { module: "api"});
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
				var fn = env.root + '/files' + req.params[0];
				fs.stat(fn, function(err, stat) {
				      if(err == null) {
					  res.sendFile(fn);
				      } else if(err.code === 'ENOENT') {
					  res.render('html/page404.ect');
				      }
				});
			}
		};	
	};
	
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
