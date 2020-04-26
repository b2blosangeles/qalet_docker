(function () { 
	var obj =  function (env, pkg, req, res) {
		var CP = new pkg.crowdProcess(); 
		this.call = function(p) {
			var me = this, _f = {}, cfg = {};
			
			var appName = req.query.nameSpace,
			    dirName = env.adminFolder + '/httpPackage/' + appName,
			    fn = dirName + '.json';
			
			res.send(cfg);
			return true;
			/*		
			
			try {
				delete require.cache[fn];
				var cfg = require(fn);
			}  catch (err) {};
			

			_f['common'] = function(cbk) {
				var dirCommon = env.adminFolder + '/httpPackage/commonModule'; 
				pkg.fs.readdir(dirCommon, (err, files) => {
					var list = (!err) ? files : [];
				  	for (var i = 0; i < list.length; i++) {
						list[i] = dirCommon + '/' + list[i];
					}
					cbk(list);
				});
				return true;
			}
			_f['app']  = function(cbk) {
				var list = (!cfg.modules) ? [] : cfg.modules;
		
				for (var i = 0; i < list.length; i++) {
					list[i] =  dirName + '/' + list[i];
				}
				cbk(list);
				
			}
			
			_f['main'] = function(cbk) {
				if (!cfg.main) {
					cbk(false)
				} else {
					pkg.fs.readFile(dirName + '/' + cfg.main, 'utf8', function (err,data) {
						cbk ((err)? false :data);
					});
				}
			} 
			CP.serial(
				_f,
				function(data) {
					me.veuFiles({
						common 	: CP.data.common,
						app	: CP.data.app,
						main	: 
					});
				}, 1000
			)
			*/
		}
		this.vueFile = function(list, idx) {
			return function(cbk) {
				let lfn =  list[idx];
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
		}
		this.veuFiles = function(cfg) {
			var me = this;
			var _f = {}; 
			var listComm	= cfg.common,
			    listApp	= cfg.app
			    

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
			
			for (var i = 0; i < listComm.length; i++) {
				_f['comm_' + i] = me.vueFile(listComm, i);
			}
	
			for (var i = 0; i < listApp.length; i++) {
				_f['app_' + i] = me.vueFile(listApp, i);
			}
			
			CP.serial(
				_f,
				function(data) {
				
					var css_str = '', 
					str = "/*--- vue.min.js ---*/\n" + CP.data['vue.min.js'] + "\n";
					str += "/*--- vue-resource.1.5.1.min.js ---*/\n" + CP.data['vue-resource.1.5.1.min.js'] + "\n";
					str += "/*--- tools.js ---*/\n" +  CP.data['tools'] + "\n";
					
					str += "/*--- commModule code ---*/\n"
					str += "var commModule = {}; \n";
					
					for (var i = 0; i < listComm.length; i++) {
						let lfn =  listComm[i];
						let fileName = lfn.substring(lfn.lastIndexOf('/')+1).replace(/\..*$/,'');
						
						var tmp = 'return Vue.component("' + fileName + '", {';
						tmp += 'template : "' + CP.data['comm_' + i].template + '", '; 
						tmp += 'template : decodeURIComponent("' + CP.data['comm_' + i].template + '"), '; 
						tmp += CP.data['comm_' + i].script + '}); ';
						tmp = encodeURIComponent(tmp);

						
						str += 'try { commModule.' + fileName;
						str +=	' = new Function(decodeURIComponent("'+ tmp + '"))() '; 
						str += '} catch (e) { console.log("' + listComm[i] + '::" + e.toString()); }' + "\n";
												
						css_str += CP.data['comm_' + i].style;
						
					}
					
					var nameSpace = (req.query.nameSpace) ? req.query.nameSpace : 'vueCommon';
					
					str += "/*--- " + nameSpace + " code ---*/\n"
					str += "var " + nameSpace + " = {}; \n";
					
					for (var i = 0; i < listApp.length; i++) {
						let lfn =  listApp[i];
						let fileName = lfn.substring(lfn.lastIndexOf('/')+1).replace(/\..*$/,'');
						
						var tmp = 'return Vue.component("' + fileName + '", {';
						tmp += 'template : "' + CP.data['app_' + i].template + '", '; 
						tmp += 'template : decodeURIComponent("' + CP.data['app_' + i].template + '"), '; 
						tmp += CP.data['app_' + i].script + '}); ';
						tmp = encodeURIComponent(tmp);

						str += 'try { ' + nameSpace + '.' + fileName;
						str +=	' = new Function(decodeURIComponent("'+ tmp + '"))() '; 
						str += '} catch (e) { console.log("' + listApp[i] + '::" + e.toString()); }' + "\n";
												
						css_str += CP.data['app_' + i].style;
						
					}
					 
					
					css_str = encodeURIComponent(css_str);
					str += "Vue.tools.addcss('" + css_str + "'); " + "\n";
					/*
					if (CP.data.main) {
						str += CP.data.main;
					}*/
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
