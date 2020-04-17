let code = `<template><section><h1>SFC string.</h1></template><script>module.exports = {computed: {random() {return Math.random()}}}<\/script>`;

var vueCommon = {
    A : codeVeuSFCLoader('/commLib/vue/componentA.vue'),
    B : codeVeuSFCLoader(code),
    C : codeVeuSFCLoader('/commLib/vue/componentC.vue')
}
