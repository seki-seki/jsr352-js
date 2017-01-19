'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

module.exports = function(group, element, bpmnFactory) {
    group.entries.push(entryFactory.textField({
      id: 'name',
      description: 'Specifies the name of a batch artifact',
      label: 'name',
      modelProperty: 'name'
    }));
};