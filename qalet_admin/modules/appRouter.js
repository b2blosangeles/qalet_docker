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
		this.dbs = [
			{
				code	: 'mysql_prod', 
				gitHub	: 'https://github.com/b2blosangeles/docker_mysql.git',
				branch	: 'master',
				rootpass: 'Trinet2020#',
				port	: '3306'
			}
		];
		this.vhosts = [
			{
				serverName	: 'www.shusiou.win', 
				serverAlias	: 'shusiou.win',
				gitHub		: 'https://github.com/b2blosangeles/docker_apachePHP.git',
				innerPort	: 80,
				gatewayIp	: '173.28.5.254',
				gatewayPort: 20001
			}
		];
		this.addHost = function() {
			var me = this;
			var vhostsCFG = {
				vhosts	: me.vhosts,
				rootFolder	: '/var/app_qalet'
			};			
			var CP = new pkg.crowdProcess(),_f = {}; 
			_f['prepareFolder'] = function(cbk) {
				var cmd = "mkdir -p /var/qalet/vhost_setting "
				exec(cmd, 
				     {maxBuffer: 1024 * 2048},
				     function(error, stdout, stderr) {
					let status = stdout.replace(/\r?\n|\r/g, '');
					cbk(status);
				});
			}
			_f['createConfigFile'] = function(cbk) {
				var str = pkg.tpl.render('tpl/dockerVirturehostProxyConfig.ect', vhostsCFG);
				fs.writeFile('/var/qalet/vhost_setting/vhost.conf', str, function(err){
					cbk(true);
				});
			}
			_f['createDockerBuilder'] = function(cbk) {
				var str = pkg.tpl.render('tpl/virtualHostDockerTPL.ect', vhostsCFG);
				fs.writeFile('/var/qalet_tasks/niu.sh', str, function(err){
					cbk(true);
				});
			}
			CP.serial(
				_f,
				function(data) {
			   		res.send(data);
			   	},
			   	60000
			);
		}
		this.showDbs = function() {
			var me = this;
			var CP = new pkg.crowdProcess(),_f = {}; 
			_f['checkDbs'] = function(cbk) {
				var dbs=[];
				try {
					delete require.cache[env.root + '/db_setting/dbs.json'];
					dbs = require(env.root + '/db_setting/dbs.json');
				} catch(e) {
					
				} 
				cbk(dbs);
			}
			CP.serial(
				_f,
				function(data) {
					res.render('html/frame.ect', {module:'dbs', 
						dbs : CP.data.checkDbs});
			   	},
			   	6000
			);
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
			var patt = new RegExp('/(api|package|cms)(\/.+|\/|)$', 'i');
			var v = p.match(patt);
			if ((v) && typeof v == 'object') {
				switch (v[1]) {
					case 'api':
						delete require.cache[__dirname + '/apiModule.js'];
						var API  = require(__dirname + '/apiModule.js');
						var api = new API(env, pkg, req, res);
						if (v.cmd === '/addMySQLDB') {
							api.addDB();
						} else {
							api.removeDB();
						}
						break;
					default:
						res.send(req.body);
					//	res.render('html/index.ect', { module: "Others"});
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
						data : {module : "Home"}
				},
				"/about": {
						tpl : "html/about.ect",
						data : {module : "About"}
					},
				"/virtualHosts": {
						tpl : "html/virtualHosts.ect",
						data : {module : "virtualHosts", vhosts	: me.vhosts}
					},
				"/addMySQLDB": {
						tpl : "html/addMySQLDB.ect",
						data : {module : "addMySQLDB"}
					},
				"/editVirtualHosting": {
						tpl : "html/editVirtualHosting.ect",
						data : {module : "editVirtualHosting"}
					},
				"/phpMyAdmin": {
						tpl : "html/phpMyAdmin.ect",
						data : {module : "phpMyAdmin"}
					}
			}
			
			var patt = new RegExp('^/(dbs|addHost|checkCodeUpdate|vhost|startup|api|checkip|package|cms)(\/.+|)', 'i');
			var v = p.match(patt);

			if ((v) && typeof v == 'object') {
				switch (v[1]) {
					case 'checkCodeUpdate':
						me.checkCodeUpdate();
						break;
						
					case 'addHost':
						me.addHost(v[1]);
						break;
					case 'addTask':
						me.addTask(v[1]);
						break;						
					case 'vhost':
						me.runScript(v[1]);
						break;
					case 'startup':
						me.runScript(v[1]);
						break;
					case 'dbs':
						me.showDbs();
						break;	
					case 'api':
						res.send(__dirname + '-/apiModule.js');
						break;
						res.render('html/frame.ect', {});
						me.addDB();
						/*
						delete require.cache[__dirname + '/apiModule.js'];
						var api  = require(__dirname + '/apiModule.js');
						res.render('html/frame.ect', { module: "api 66 get"});
						*/
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
				
				if (TPA[p]) {
					// TPA[req.params[0]].tpl
					res.render('html/frame.ect', TPA[p].data);
					return true;
				} else {
					var fn = env.adminFolder + '/files' + req.params[0];
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
