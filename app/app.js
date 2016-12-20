'use strict';

// inlined diagram; load it from somewhere else if you like
var pizzaDiagram = require('../resources/pizza-collaboration.bpmn');

// our custom modeler
var CustomModeler = require('./custom-modeler');

var propertiesPanelModule = require('bpmn-js-properties-panel'),
    // providing camunda executable properties, too
    propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda'),
    camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda');


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
  // needed if you'd like to maintain camunda:XXX properties in the properties panel
  moddleExtensions: {
    camunda: camundaModdleDescriptor
  }
});

modeler.importXML(pizzaDiagram, function(err) {

  if (err) {
    console.error('something went wrong:', err);
  }

  modeler.get('canvas').zoom('fit-viewport');
});


// expose bpmnjs to window for debugging purposes
window.bpmnjs = modeler;
