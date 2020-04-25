(function () { 
	var obj =  function (env, pkg, req, res) {
		var CP = new pkg.crowdProcess(); 
		this.call = function(p) {
			var me = this, _f = {};
			_f['common'] = function(cbk) {
				var dirname = env.adminFolder + '/httpPackage/commonModule'; 
				pkg.fs.readdir(dirname, (err, files) => {
				  cbk((!err) ? files : [])
				});
				for (var i = 0; i < files.length; i++) {
					files[i] = dirname + '/' + files[i];
				}
				return true;
			}
			_f['app'] = function(cbk) {
				var appName = p.replace(/^\//, ''),
				    dirName = env.adminFolder + '/httpPackage/' + appName,
				    fn = dirName + '.json';
				var files = []
				try {
					delete require.cache[fn];
					files = require(fn);
				}  catch (err) {};
				for (var i = 0; i < files.length; i++) {
					files[i] = dirname + '/' + files[i];
				}
				cbk(files);
			} 
			CP.serial(
				_f,
				function(data) {
					res.send(data);
					// res.send(CP.data.common.concat(CP.data.app);
				}, 6000
			)
		}
		this.veuFiles = function(cfg) {
			var me = this;
			var _f = {}; 
			var list = cfg.files, _folder = env.adminFolder + '/httpPackage' + cfg.folder;

			_f['vue.min.js'] = function(cbk) {
				let lfn = env.adminFolder  + '/httpPackage/lib/vue.min.js'; 
				pkg.fs.readFile(lfn, 'utf8', function(err, data){
					data = (err) ? '' : data.replace(/\/\*[\s\S]*?\*\/|^(\s*|^)\/\/.*$/gm, '');
					cbk(data);
				}); 
				return true;
			}
			
			_f['vue-resource.1.5.1.min.js'] = function(cbk) {
				let lfn = env.adminFolder  + '/httpPackage/lib/vue-resource.1.5.1.min.js'; 
				pkg.fs.readFile(lfn, 'utf8', function(err, data){
					data = (err) ? '' : data.replace(/\/\*[\s\S]*?\*\/|^(\s*|^)\/\/.*$/gm, '');
					cbk(data);
				}); 
				return true;
			}

			_f['tools'] = function(cbk) {
				let lfn = env.adminFolder  + '/httpPackage/lib/tools.js'; 
				pkg.fs.readFile(lfn, 'utf8', function(err, data){
					data = (err) ? '' : data.replace(/\/\*[\s\S]*?\*\/|^(\s*|^)\/\/.*$/gm, '');
					cbk(data);
				}); 
				return true;
			}	
			
			for (var i = 0; i < list.length; i++) {
				_f['_' + i] = (function(i) {
					return function(cbk) {
						let lfn =  _folder + '/' + list[i].replace(/^\//, '');
						pkg.fs.readFile(lfn, 'utf8', function(err, data){
							
							var template = data.match(/\<template\>((.|\r|\n|\r\n|\n\r)*)\<\/template\>/igm);
							var templateCode = (!template || !template[0]) ? '<template></template>' : template[0];
							templateCode = templateCode.replace(/(\r|\n|\r\n|\n\r)/gim,'');
							
						
							var script_a = data.match(/\<script\>((.|\r|\n|\r\n|\n\r)*)\<\/script\>/im);
							var script =  (!script_a || !script_a[1]) ? '' : script_a[1].replace(/\/\*[\s\S]*?\*\/|^(\s*|^)\/\/.*$/gm, '');
							script = script.replace(/\s+$/,"")
							var mscript = script.match(/(\s)module\.exports(\s)\=(\s)\{((.|\r|\n|\r\n|\n\r)*)\}$/im);
							var scriptCode = (!mscript || !mscript[4]) ? '' : mscript[4];
							scriptCode = scriptCode.replace(/(\r|\n|\r\n|\n\r)/gim,' ');
							
							var style = data.match(/\<style\>((.|\r|\n|\r\n|\n\r)*)\<\/style\>/im);
							var styleCode = (!style || !style[1]) ? '' : style[1];
							styleCode =styleCode.replace(/\/\*[\s\S]*?\*\/|^(\s*|^)\/\/.*$/gm, '');
							cbk ({
								template : encodeURIComponent(templateCode),
								script : scriptCode,
								style : styleCode
							});
							
						}); 
					}
				})(i)
			}
			
			CP.serial(
				_f,
				function(data) {
				
					var css_str = '', 
					str = "/*--- vue.min.js ---*/\n" + CP.data['vue.min.js'] + "\n";
					
					str += "/*--- vue-resource.1.5.1.min.js ---*/\n" + CP.data['vue-resource.1.5.1.min.js'] + "\n";
					
					str += "/*--- tools.js ---*/\n" +  CP.data['tools'] + "\n";
					
					var nameSpace = (req.query.nameSpace) ? req.query.nameSpace : 'vueCommon';
					
					str += "/*--- " + nameSpace + " code ---*/\n"
					
					str += "var " + nameSpace + " = {}; \n";
					
					for (var i = 0; i < list.length; i++) {
						let lfn =  _folder + '/' + list[i].replace(/^\//, '');
						let fileName = lfn.substring(lfn.lastIndexOf('/')+1).replace(/\..*$/,'');
						
						var tmp = 'return Vue.component("' + fileName + '", {';
						tmp += 'template : "' + CP.data['_' + i].template + '", '; 
						tmp += 'template : decodeURIComponent("' + CP.data['_' + i].template + '"), '; 
						tmp += CP.data['_' + i].script + '}); ';
						tmp = encodeURIComponent(tmp);

						
						str += 'try { ' + nameSpace + '.' + fileName;
						str +=	' = new Function(decodeURIComponent("'+ tmp + '"))() '; 
						str += '} catch (e) { console.log("' + list[i] + '::" + e.toString()); }' + "\n";
												
						css_str += CP.data['_' + i].style;
						
					}
					css_str = encodeURIComponent(css_str);
					str += "Vue.tools.addcss('" + css_str + "');" + "\n";
					
					res.header("Access-Control-Allow-Origin", "*");
					res.header("Access-Control-Allow-Headers", "X-Requested-With");
					res.header('Access-Control-Allow-Headers', 'Content-Type'); 
					res.setHeader('Content-Type', "application/javascript");			
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
