!function o(r,e,n){function u(i,f){if(!e[i]){if(!r[i]){var l="function"==typeof require&&require;if(!f&&l)return l(i,!0);if(t)return t(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var s=e[i]={exports:{}};r[i][0].call(s.exports,function(o){var e=r[i][1][o];return u(e?e:o)},s,s.exports,o,r,e,n)}return e[i].exports}for(var t="function"==typeof require&&require,i=0;i<n.length;i++)u(n[i]);return u}({1:[function(o,r,e){o("./module1.js"),o("./module2.js"),$("h1").html("Hola Browserify")},{"./module1.js":2,"./module2.js":3}],2:[function(o,r,e){console.log("modulo 1")},{}],3:[function(o,r,e){console.log("module 2")},{}]},{},[1]);