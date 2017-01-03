'use strict';

var edn = require("jsedn");

function ComponetntProvider() {
//  TODO:now,it does not get environment value from server 
    var controlBusURL = "http://localhost:45102";
    var xhr = new XMLHttpRequest();
    var map;
    xhr.addEventListener("load", function (ev) {
        map = edn.parse(xhr.responseText);
    });
    console.log(map);
    xhr.open("GET", controlBusURL + "/app/default");
            function getBatchlets(){};
}
