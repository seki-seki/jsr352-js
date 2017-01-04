'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
var componentProvider = require('../../util/ComponentProvider');
module.exports = function(group, element) {
  componentProvider.getBatchlets();
  if (element.businessObject.batchletOrChunk === "batchlet") {
    group.entries.push(entryFactory.selectBox({
      id : 'batchlet compornent',
      description : 'batchlet compornent ref',
      label : 'batchlet compornent ref',
      modelProperty : 'batchletRef',
      selectOptions : [ {name: '', value: ''},{name: 'TODO: Make it can get component through XRH', value: 'TODO: Make it can get component through XRH'}]
    }));
  }
};
