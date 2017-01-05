'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

var is = require('bpmn-js/lib/util/ModelUtil').is;

module.exports = function(group, element) {
  if (element.businessObject.batchletOrChunk === "batchlet") {
    group.entries.push(entryFactory.selectBox({
      id : 'batchlet compornent',
      description : 'batchlet compornent ref',
      label : 'batchlet compornent ref',
      modelProperty : 'batchletCompornent',
      selectOptions : [ {name: 'TODO: Make it can get component through XRH', value: 'TODO: Make it can get component through XRH'}]
    }));
  }
};
