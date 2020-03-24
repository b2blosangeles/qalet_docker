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
			
			var vhosting = {
				vhosts	: [
					{serverName : 'www.shusiou.win', serverAlias: 'shusiou.win', innerPort : 80, gatewayPort: 10080},
					{serverName : 's1.shusiou.win', innerPort : 80, gatewayPort: 10081},
					{serverName : 's2.shusiou.win', innerPort : 80, gatewayPort: 10082}
				],
				id		: 'www.shusiou.win',
				gatewayIp	: '173.28.5.254',
				github  	: 'https://github.com/b2blosangeles/docker_apache_php.git'
			} 
			
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
							    	var str = pkg.tpl.render('tpl/dockerVirturehostProxyConfig.ect', vhosting); 
							    } else {
								var str = pkg.tpl.render('tpl/dockerVsvrCom.ect', vhosting.vhosts[0]); 
							    }
							    
							    res.send(str);
							}
						  });
				}	
			});

		}
		
		/*
		this.sendPackage = function(v) {
			var me = this;
			var fn = me.envSite(env).site_path + '/files/package/' + v;
			delete require.cache[__dirname + '/taoPackage.js'];
			var router  = require(__dirname + '/taoPackage.js');
			var P = new router(pkg, me.envSite(env), req, res);						
			P.load(fn);								
		};	
		this.sendFile = function(v) {
			var me = this, fn = me.envSite(env).site_path + '/files/' + v;
			pkg.fs.exists(fn, function(exists) {
				if (exists) {
					res.sendFile(fn); 									
				} else {
					me.send404(v);					
				} 
			});				
		};
		this.sendCMSFile = function(v) {
			var me = this, fn = env.site_contents_path + '/' + v;
			pkg.fs.exists(fn, function(exists) {
				if (exists) {
					res.sendFile(fn); 									
				} else {
					me.send404(v);					
				} 
			});				
		};
		
		this.runApi = function(v) {
			var me = this;
			var p = me.envSite(env).site_path + '/api/' + v;
			
			var patt = new RegExp('.api$', 'i');
			if (!patt.test(v)) {
				me.send404(v);
				return true;
			}
			p = p.replace(patt,'.js');
			
			pkg.fs.exists(p, function(exists) {
				if (exists) {
					pkg.fs.stat(p, function(err, stats) {
						 if (stats.isFile()) {
							
							try {
								delete require.cache[p];
								var taskClass = require(p);
								var entity = new taskClass(pkg, me.envSite(env), req, res, io);
								entity.call();
							} catch(err) {
								pkg.fs.readFile(p, 'utf8', function(err, code) {
									if (!err) {
										try {
											new Function('TAO', code)
											({require : require, pkg: pkg, env: me.envSite(env), req : req, res : res, io : io});
										} catch(err) {
											me.send500(err);
										}
									} else {
										me.send500(err);										
									}
								});								
							}		

						 } else {
							me.send404(v);									 
						 }
					});									
				} else {
					me.send404(v);						
				} 
			});	
		};
		
		this.isIp = function(ip) {
		    var arrIp = ip.split(".");
		    if (arrIp.length !== 4) return false;
		    for (let oct of arrIp) {
			if ( isNaN(oct) || Number(oct) < 0 || Number(oct) > 255)
			    return false;
		    }
		    return true;
		};
	
		this.sendWhoami = function() {
			var me = this;
			pkg.fs.readFile('/var/.tao_whoami.data', 'utf8', function(err,data) {
				if (!err && me.isIp(data)) {
					res.send(data);	
				} else {
					res.send('');	
				}
			});	
		}
		this.snedIndex = function(p) {
			var me = this;
			pkg.fs.exists(me.envSite(env).site_path  + '/files/index.html', (exists) => {
			    if (exists) {
				    me.sendFile('index.html');
			    } else {
				    pkg.fs.exists(me.envSite(env).site_path  + '/api/index.js', (exists) => {
				    	if (exists) me.runApi('index.api');
					else me.send404('index');
				    });
			    }	    
			});
		};	*/
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
