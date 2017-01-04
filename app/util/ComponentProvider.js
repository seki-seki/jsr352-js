'use strict';

var edn = require('edn');
//  TODO:now,it does not get environment value from server 
var controlBusURL = document.querySelector("meta[name=control-bus-url]").getAttribute("content");
var appName = "default";
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
var map;
xhr.addEventListener("load", function (ev) {
    map = edn.parse(xhr.responseText);
});
xhr.open("GET", controlBusURL + "/" + appName + "/batch-components");
xhr.send();
console.log(map);

function ComponentProvider() {

}

ComponentProvider.getBatchlets = function () {
    console.log(map);
    return appName;
};

module.exports = ComponentProvider;