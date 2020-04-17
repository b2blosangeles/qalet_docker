let code = `<template><section><h1>SFC string.</h1></template><script>module.exports = {computed: {random() {return Math.random()}}}<\/script>`;

var vueCommon = {
    A : codeSFCLoader('/commLib/vue/componentA.vue'),
    B : codeSFCLoader(code),
    C : codeSFCLoader('/commLib/vue/componentC.vue')
}
