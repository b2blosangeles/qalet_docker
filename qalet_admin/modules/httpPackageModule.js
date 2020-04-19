(function () { 
	var obj =  function (env, pkg, req, res) {
		this.call = function(p) {
			var me = this;
			var fn = env.adminFolder + '/httpPackage/' + p.replace(/^\//, '') + '.json';
			pkg.fs.stat(fn, function(err, stat) {
			      if(err == null) {
				  if (stat.isDirectory()) {
					res.render('html/page404.ect');
				  } else {
					let cfg = {};
					try {
						delete require.cache[fn];
						cfg = require(fn);
					}  catch (err) {}

					me.veuFiles(cfg);
				  }
			      } else if(err.code === 'ENOENT') {
				  res.render('html/page404.ect');
			      }
			});
		}
		this.removeComments = function(str) {
		    str = ('__' + str + '__').split('');
		    var mode = {
			singleQuote: false,
			doubleQuote: false,
			regex: false,
			blockComment: false,
			lineComment: false,
			condComp: false 
		    };
		    for (var i = 0, l = str.length; i < l; i++) {

			if (mode.regex) {
			    if (str[i] === '/' && str[i-1] !== '\') {
				mode.regex = false;
			    }
			    continue;
			}

			if (mode.singleQuote) {
			    if (str[i] === "'" && str[i-1] !== '\') {
				mode.singleQuote = false;
			    }
			    continue;
			}

			if (mode.doubleQuote) {
			    if (str[i] === '"' && str[i-1] !== '\') {
				mode.doubleQuote = false;
			    }
			    continue;
			}

			if (mode.blockComment) {
			    if (str[i] === '*' && str[i+1] === '/') {
				str[i+1] = '';
				mode.blockComment = false;
			    }
			    str[i] = '';
			    continue;
			}

			if (mode.lineComment) {
			    if (str[i+1] === 'n' || str[i+1] === 'r') {
				mode.lineComment = false;
			    }
			    str[i] = '';
			    continue;
			}

			if (mode.condComp) {
			    if (str[i-2] === '@' && str[i-1] === '*' && str[i] === '/') {
				mode.condComp = false;
			    }
			    continue;
			}

			mode.doubleQuote = str[i] === '"';
			mode.singleQuote = str[i] === "'";

			if (str[i] === '/') {

			    if (str[i+1] === '*' && str[i+2] === '@') {
				mode.condComp = true;
				continue;
			    }
			    if (str[i+1] === '*') {
				str[i] = '';
				mode.blockComment = true;
				continue;
			    }
			    if (str[i+1] === '/') {
				str[i] = '';
				mode.lineComment = true;
				continue;
			    }
			    mode.regex = true;

			}

		    }
		    return str.join('').slice(2, -2);
		}
		this.veuFiles = function(cfg) {
			
			var me = this;
			var CP = new pkg.crowdProcess(),_f = {}; 
			var list = cfg.files, _folder = env.adminFolder + '/httpPackage' + cfg.folder;
			
			_f['vue.min.js'] = function(cbk) {
				let lfn = env.adminFolder  + '/httpPackage/lib/vue.min.js'; 
				pkg.fs.readFile(lfn, 'utf8', function(err, data){
					cbk(data);
				}); 
				return true;
			}
			
			_f['codeVeuSFCLoader'] = function(cbk) {
				let lfn = env.adminFolder  + '/httpPackage/lib/codeVeuSFCLoader.js'; 
				pkg.fs.readFile(lfn, 'utf8', function(err, data){
					data = data.replace(/(\/\/[^\n\r]*[\n\r]+)/g, '');
					cbk(data);
				}); 
				return true;
			}	
			
			for (var i = 0; i < list.length; i++) {
				_f['_' + i] = (function(i) {
					return function(cbk) {
						let lfn =  _folder + '/' + list[i].replace(/^\//, '');
						pkg.fs.readFile(lfn, 'utf8', function(err, data){
							data = (err) ? '' : data;
							// me.removeComments(data);
							cbk(encodeURIComponent(data.replace(/(\r\n|\n|\r)/gm,' '))); 
						}); 
						return true;
					}
				})(i)
			}
			
			CP.serial(
				_f,
				function(data) {
					
					var str = "/*--- vue.min.js ---*/\n" + CP.data['vue.min.js'] + "\n";
					str += "/*--- codeVeuSFCLoader.js ---*/\n" +  CP.data['codeVeuSFCLoader'] + "\n";
					
					var nameSpace = (req.query.nameSpace) ? req.query.nameSpace : 'vueCommon';
					
					str += "/*--- " + nameSpace + " code ---*/\n"
					
					str += "var " + nameSpace + " = {}; \n";
					
					for (var i = 0; i < list.length; i++) {
						let lfn =  _folder + '/' + list[i].replace(/^\//, '');
						let fileName = lfn.substring(lfn.lastIndexOf('/')+1).replace(/\..*$/,' ');
						
						str += nameSpace + '.' + fileName + ' = ';
						str += "codeVeuSFCLoader(decodeURIComponent(`" + CP.data['_' + i] + "`)); \n";
					}
					res.send(str);
			   	},
			   	6000
			);
			
		}
	};

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} else {
		window.httpPackageModule = function() {
			return obj; 
		}
	}
	
})();
