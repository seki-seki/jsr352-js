'use strict';

var CustomModeler = require('./custom-modeler');
var $ = require('jquery');
var propertiesPanelModule = require('bpmn-js-properties-panel'),
    propertiesProviderModule = require('./custom-property'),
    camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda'),
    jsr352ModdleDescriptor = require('./descriptors/jsr352');

var edn = require('edn');
var controlBusURL = document.querySelector("meta[name=control-bus-url]").getAttribute("content");
var jobName = document.querySelector("meta[name=job-name]").getAttribute("content");
var appName = "default";

var modeler = new CustomModeler({
    container: '#canvas',
    keyboard: { bindTo: document },
    propertiesPanel: {
        parent: '#js-properties-panel'
    },
    additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule
    ],
  moddleExtensions: {
    jsr352: jsr352ModdleDescriptor,
    camunda: camundaModdleDescriptor
  }
});

var xhr = new XMLHttpRequest();
xhr.addEventListener("load", function (ev) {
    // TODO: Error Handling.
    var jobDiagram = edn.valueOf(edn.parse(xhr.responseText))["job/bpmn-xml-notation"];
    modeler.importXML(jobDiagram, function(err) {
      if (err) {
        console.error('something went wrong:', err);
      }

      modeler.get('canvas').zoom('fit-viewport');
    });
});
xhr.withCredentials = true;
xhr.open("GET", controlBusURL + "/" + appName + "/job/" + jobName + "/bpmn");
xhr.send();

function saveSVG(done) {
  modeler.saveSVG(done);
}

function saveDiagram(done) {
  modeler.saveXML({format: true}, function(err, xml) {
    done(err, xml);
  });
}

$(document).on('ready', function() {

  $('#js-create-diagram').click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    createNewDiagram();
  });

  var saveLink = $('#save-job');
  saveLink.addClass('active');

  $('.buttons a').click(function(e) {
    if (!$(this).is('.active')) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  saveLink.click(function(){
    saveSVG(function(err, svg) {
      saveDiagram(function(err, xml) {
        var job = {"job/bpmn-xml-notation": xml, "job/svg-notation": svg};
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function (ev) {
            // TODO: Error Handling.
            console.log(xhr.responseText);
            window.close();
        });
        xhr.withCredentials = true;
        xhr.open("POST", controlBusURL + "/" + appName + "/job/" + jobName + "/bpmn");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(job));
      });
    });
    console.log("test");
  });
});

// expose bpmnjs to window for debugging purposes
window.bpmnjs = modeler;
