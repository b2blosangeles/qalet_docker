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
		this.callA = function(p) {
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

					me.plusFiles(cfg);
				  }
			      } else if(err.code === 'ENOENT') {
				  res.render('html/page404.ect');
			      }
			});
		}
	
		this.plusFiles = function(cfg) {
			
			var me = this;
			var CP = new pkg.crowdProcess(),_f = {}; 
			var list = cfg.files, _folder = env.adminFolder + '/httpPackage' + cfg.folder;	
			list = ["message.vue"];
			for (var i = 0; i < list.length; i++) {
				_f['_' + i] = (function(i) {
					return function(cbk) {
						let lfn =  _folder + '/' + list[i].replace(/^\//, '');
						pkg.fs.readFile(lfn, 'utf8', function(err, data){
							data = (err) ? '' : data.replace(/(\r|\n|\r\n|\n\r)/gim,' ');
							var template = data.match(/\<template\>(.*?)\<\/template\>/igm);
							var script0 = data.match(/\<script\>(.*?)\<\/script\>/im);
							var mscript0 = script0[1].match(/(\s)module\.exports(\s)\=(\s){(.*?)}(\s)/im);
							var script = mscript0[4];
							var style = data.match(/\<style\>(.*?)\<\/style\>/im);
							cbk ({
								template : encodeURIComponent(template[0]),
								script : script,
								style : style[1]
							});
						}); 
					}
				})(i)
			}
			
			CP.serial(
				_f,
				function(data) {

					var str = "/*------------*/\n";
					
					var nameSpace = (req.query.nameSpace) ? req.query.nameSpace : 'vueCommon';
					
					str += "/*--- " + nameSpace + " code ---*/\n"
					
					str += "var " + nameSpace + " = {}; \n";
					
					for (var i = 0; i < list.length; i++) {
						let lfn =  _folder + '/' + list[i].replace(/^\//, '');
						let fileName = lfn.substring(lfn.lastIndexOf('/')+1).replace(/\..*$/,' ');
						
						str += nameSpace + '.' + fileName + ' = Vue.component("' + fileName + '", {';
						str += 'template : decodeURIComponent("' + CP.data['_' + i].template + '", '; 
						str += CP.data['_' + i].script + ' ' +  +  ' }); ' + "\n";
					}
					res.header("Access-Control-Allow-Origin", "*");
					res.header("Access-Control-Allow-Headers", "X-Requested-With");
					res.header('Access-Control-Allow-Headers', 'Content-Type'); 
					res.setHeader('Content-Type', "application/javascript");			
					res.send(str);
			   	},
			   	6000
			);
			
		}
		
		this.veuFiles = function(cfg) {
			
			var me = this;
			var CP = new pkg.crowdProcess(),_f = {}; 
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
			
			_f['codeVeuSFCLoader'] = function(cbk) {
				let lfn = env.adminFolder  + '/httpPackage/lib/codeVeuSFCLoader.js'; 
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
							data = (err) ? '' : data.replace(/\/\*[\s\S]*?\*\/|^(\s*|^)\/\/.*$/gm, '');
							data = data.replace(/\#/gm, '[%23]');
							cbk(encodeURIComponent(data.replace(/(\r|\n|\r\n|\n\r)/gm,' '))); 
						}); 
						return true;
					}
				})(i)
			}
			
			CP.serial(
				_f,
				function(data) {
					
					var str = "/*--- vue.min.js ---*/\n" + CP.data['vue.min.js'] + "\n";
					
					str += "/*--- vue-resource.1.5.1.min.js ---*/\n" + CP.data['vue-resource.1.5.1.min.js'] + "\n";
					
					str += "/*--- codeVeuSFCLoader.js ---*/\n" +  CP.data['codeVeuSFCLoader'] + "\n";
					
					var nameSpace = (req.query.nameSpace) ? req.query.nameSpace : 'vueCommon';
					
					str += "/*--- " + nameSpace + " code ---*/\n"
					
					str += "var " + nameSpace + " = {}; \n";
					
					for (var i = 0; i < list.length; i++) {
						let lfn =  _folder + '/' + list[i].replace(/^\//, '');
						let fileName = lfn.substring(lfn.lastIndexOf('/')+1).replace(/\..*$/,' ');
						
						str += nameSpace + '.' + fileName + ' = ';
						str += 'codeVeuSFCLoader(decodeURIComponent("' + CP.data['_' + i] + '")); ' + "\n";
					}
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
