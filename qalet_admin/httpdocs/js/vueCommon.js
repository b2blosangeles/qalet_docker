let code = `<template><section><h1>This component has been mounted dynamically using <em>http-vue-loader</em> and a harcoded SFC string.</h1><p>Here’s a random number from the component: {{ random }}</p></section></template><script>module.exports = {computed: {random() {return Math.random()}}}<\/script>`;
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
