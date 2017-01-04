'use strict';

var edn = require('jsedn');
//  TODO:now,it does not get environment value from server 
var controlBusURL = "http://172.24.34.214:45102";
var appName = "default";
var xhr = new XMLHttpRequest();
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