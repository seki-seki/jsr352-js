'use strict';

// inlined diagram; load it from somewhere else if you like
var pizzaDiagram = require('../resources/pizza-collaboration.bpmn');

// our custom modeler
var CustomModeler = require('./custom-modeler');


var modeler = new CustomModeler({ container: '#canvas', keyboard: { bindTo: document } });

modeler.importXML(pizzaDiagram, function(err) {

  if (err) {
    console.error('something went wrong:', err);
  }

  modeler.get('canvas').zoom('fit-viewport');
});


// expose bpmnjs to window for debugging purposes
window.bpmnjs = modeler;
