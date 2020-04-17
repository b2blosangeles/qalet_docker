let code = `<template><section><h1>SFC string.</h1></template><script>module.exports = {computed: {random() {return Math.random()}}}<\/script>`;
httpVueLoader.httpRequest = function(code) {
  return new Promise(function(resolve, reject) {
    resolve(code);
  });
};
var vueCommon = {
    A : httpVueLoader(code),
    B : httpVueLoader(code)

}
//     C : httpVueLoader('/commLib/vue/componentC.vue')
