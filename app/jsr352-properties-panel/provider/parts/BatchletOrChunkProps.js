'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

var is = require('bpmn-js/lib/util/ModelUtil').is;

module.exports = function(group, element) {

  if (is(element, 'bpmn:Task')) {
    group.entries.push(entryFactory.selectBox({
      id : 'batchlet or chunk',
      description : 'Select batchlet or chunk',
      label : 'batchlet or chunk',
      modelProperty : 'batchletOrChunk',
      selectOptions : [ {name: '', value: ''},{ name: 'batchlet', value: 'batchlet' }, { name: 'chunk', value: 'chunk' }]
    }));
  }
};
