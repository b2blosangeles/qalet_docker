let code = `<template><section><h1>SFC string.</h1></template><script>module.exports = {computed: {random() {return Math.random()}}}<\/script>`;

var vueCommon = {
    A : codeVueLoader('/commLib/vue/componentA.vue'),
    B : codeVueLoader(code),
    C : codeVueLoader('/commLib/vue/componentC.vue')
}
//     C : httpVueLoader('/commLib/vue/componentC.vue')
