if (!Vue.tools) Vue.tools = {};
Vue.tools.addcss = function (css){
    css = decodeURIComponent(css);
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    if (s.styleSheet) {   /* IE */
        s.styleSheet.cssText = css;
    } else {                /* the world */
        s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);
}
