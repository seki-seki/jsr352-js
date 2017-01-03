'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

var is = require('bpmn-js/lib/util/ModelUtil').is;

module.exports = function(group, element) {
   if (is(element, 'bpmn:Participant')) {
    group.entries.push(entryFactory.checkbox({
      id : 'restartable',
      description : 'restartable',
      label : 'is this job restartable?',
      modelProperty : 'restartable',
    }));
  }
};
