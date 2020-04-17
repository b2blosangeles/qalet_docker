let code = `<template><section><h1>SFC string.</h1></template><script>module.exports = {computed: {random() {return Math.random()}}}<\/script>`;

var vueCommon = {
    A : codeVueLoader(code),
    B : codeVueLoader('/commLib/vue/componentB.vue'),
    C : codeVueLoader('/commLib/vue/componentC.vue')
}
//     C : httpVueLoader('/commLib/vue/componentC.vue')
