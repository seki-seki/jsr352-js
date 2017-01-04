'use strict';

var edn = require('edn');
//  TODO:now,it does not get environment value from server 
var controlBusURL = "http://172.24.34.214:45102";
var appName = "default";
var xhr = new XMLHttpRequest();
var componentJSON;
xhr.addEventListener("load", function (ev) {
    componentJSON = edn.valueOf(edn.parse(xhr.responseText));
});
xhr.open("GET", controlBusURL + "/" + appName + "/batch-components");
xhr.send();

function ComponentProvider() {
}

ComponentProvider.getBatchlets = function () {
    return componentJSON["batch-component/batchlet"];
};
ComponentProvider.getItemWriters = function () {
    return componentJSON["batch-component/item-writer"];
};
ComponentProvider.getItemReaders = function () {
    return componentJSON["batch-component/item-reader"];
};
ComponentProvider.getItemProcessors = function () {
    return componentJSON["batch-component/item-processors"];
};

module.exports = ComponentProvider;