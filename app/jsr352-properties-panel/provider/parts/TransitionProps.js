'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');

var is = require('bpmn-js/lib/util/ModelUtil').is,
    getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;

module.exports = function(group, element) {
  if (is(element, 'jsr352:Transition')) {
    group.entries.push(entryFactory.validationAwareTextField({
      id : 'on',
      description : 'Specifies the exit status value that activates this end element.',
      label : 'on',
      modelProperty : 'on',
      getProperty: function(element) {
        return getBusinessObject(element).on;
      },
      setProperty: function(element, properties) {
        if (properties['on']) {
          properties['name'] = properties['on'];
        }
        return cmdHelper.updateProperties(element, properties);
      },
      validate: function(element, values) {
        var isValid = /^.+$/.test(values.startLimit);
        return isValid ? {} : {on: 'Required'};
      }
    }));
  }
};
