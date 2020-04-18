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
					let d = {};
					try {
						delete require.cache[fn];
						d = require(fn);
					}  catch (err) {}
					me.veuFiles(d.vue);
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
		this.veuFiles = function(list) {
			var me = this;
			var CP = new pkg.crowdProcess(),_f = {}; 
			
			var dirn = env.adminFolder + '/httpdocs/';
			
			delete require.cache[dirn + 'js/codeVeuSFCLoader.js'];
			var codeVeuSFCLoader = require(dirn + 'js/codeVeuSFCLoader.js');
			
			_f['codeVeuSFCLoader'] = function(cbk) {
				let lfn = dirn + 'js/codeVeuSFCLoader.js';
				pkg.fs.readFile(lfn, 'utf8', function(err, data){
					cbk(data);
				}); 
				return true;
			}	
			
			for (var i = 0; i < list.length; i++) {
				_f['_' + i] = (function(i) {
					return function(cbk) {
						let lfn = dirn + list[i].replace(/^\//, '');
						pkg.fs.readFile(lfn, 'utf8', function(err, data){
							cbk(me.removeComments(data).replace(/(\r\n|\n|\r)/gm,' ')); 
						}); 
						return true;
					}
				})(i)
			}
			
			CP.serial(
				_f,
				function(data) {
					var str = CP.data['codeVeuSFCLoader'] + "\n";
					str += "var vueCommon = {}; \n";
					
					for (var i = 0; i < list.length; i++) {
						let lfn = dirn + list[i].replace(/^\//, '');
						let fileName = lfn.substring(lfn.lastIndexOf('/')+1).replace(/\..*$/,' ');
						
						str += 'vueCommon.' + fileName + ' = ';
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
