'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');

var is = require('bpmn-js/lib/util/ModelUtil').is,
    getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;

module.exports = function(group, element) {
  if (is(element, 'jsr352:Step')) {
    group.entries.push(entryFactory.validationAwareTextField({
      id : 'start-limit',
      description : 'Specifies the number of times this step may be started or restarted. It must be a valid XML integer value',
      label : 'Start Limit',
      modelProperty : 'startLimit',
      getProperty: function(element) {
        return getBusinessObject(element).startLimit;
      },
      setProperty: function(element, properties) {
        return cmdHelper.updateProperties(element, properties);
      },
      validate: function(element, values) {
        var isValid = /^[0-9]+$/.test(values.startLimit);
        return isValid ? {} : {startLimit: 'Must be integer'};
      }
    }));

    group.entries.push(entryFactory.checkbox({
      id : 'allow-start-if-complete',
      description : 'Specifies whether this step is allowed to start during job restart, even if the step completed in a previous execution. ',
      label : 'Allow start if complete',
      modelProperty : 'allowStartIfComplete',
      getProperty: function(element) {
        return getBusinessObject(element).allowStartIfComplete;
      },
      setProperty: function(element, properties) {
        return cmdHelper.updateProperties(element, properties);
      }
    }));
  }

  if (is(element, 'jsr352:BatchletStep')) {
    group.entries.push(entryFactory.textBox({
      id : 'batchlet-ref',
      description : 'Specifies the name of a batch artifact.',
      label : 'Batchlet',
      modelProperty : 'batchletRef',
      getProperty: function(element) {
        return getBusinessObject(element).batchletRef;
      },
      setProperty: function(element, properties) {
        return cmdHelper.updateProperties(element, properties);
      }
    }));
  }
};
