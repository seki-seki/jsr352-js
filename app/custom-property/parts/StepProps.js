'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');

var is = require('bpmn-js/lib/util/ModelUtil').is,
    getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;

function chunkChildEntry(element, bpmnFactory, id) {
  var typeName = id.replace(/\b\w/g, function(l){ return l.toUpperCase() })
  var entry = entryFactory.textBox({
    id : id,
    description : 'Specifies the name of a ' + id + ' artifact.',
    label : typeName,
    modelProperty : id
  });

  entry.get = function() {
    var chunk = getBusinessObject(element).chunk;
    var props = {};
    props[id] = chunk[id] ? chunk[id].ref : '';
    return props;
  };

  entry.set = function(element, values) {
    var chunk = getBusinessObject(element).chunk;
    if (values[id]) {
      var newProperties = {};
      newProperties[id] = bpmnFactory.create('jsr352:' + typeName, {ref: values[id]});
      return cmdHelper.updateBusinessObject(chunk, getBusinessObject(chunk), newProperties);
    }
  };

  return entry;
}

module.exports = function(group, element, bpmnFactory) {


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
    var entry = entryFactory.textBox({
      id : 'batchlet',
      description : 'Specifies the name of a batch artifact.',
      label : 'Batchlet',
      modelProperty : 'batchlet',
    });

    entry.get = function() {
      var batchlet = getBusinessObject(element).batchlet;
      return {'batchlet': batchlet ? batchlet.ref : '' };
    };

    entry.set = function(element, values) {
      if (values['batchlet']) {
        var newProperties = {
          batchlet: bpmnFactory.create('jsr352:Batchlet', {ref: values['batchlet']})
        }
        return cmdHelper.updateBusinessObject(element, getBusinessObject(element), newProperties);
      }
    };

    group.entries.push(entry);
  } else if (is(element, 'jsr352:ChunkStep')) {
    group.entries.push(chunkChildEntry(element, bpmnFactory, 'reader'));
    group.entries.push(chunkChildEntry(element, bpmnFactory, 'processor'));
    group.entries.push(chunkChildEntry(element, bpmnFactory, 'writer'));

    group.entries.push(entryFactory.selectBox({
      id: 'checkpoint-policy',
      description: 'Specifies the checkpoint policy that governs commit behavior for this chunk.',
      label: 'Checkpoint Policy',
      modelProperty: 'checkpoint-policy',
      selectOptions: [
        {name: 'item', value: 'item'},
        {name: 'custom', value: 'custom'}
      ]
    }));

    group.entries.push(entryFactory.validationAwareTextField({
      id: 'item-count',
      description: 'Specifies the number of items to process per chunk when using the item checkpoint policy. ',
      label: 'Item count',
      modelProperty: 'item-count',
      getProperty: function(element) {
        return getBusinessObject(element).chunk['item-count'];
      },
      setProperty: function(element, properties) {
        var chunk = getBusinessObject(element).chunk
        if (properties['item-count']) {
          properties['item-count'] = parseInt(properties['item-count']);
          return cmdHelper.updateBusinessObject(chunk, getBusinessObject(chunk), properties);
        }
      },
      validate: function(element, values) {
        var isValid = /^[0-9]+$/.test(values['item-count']);
        return isValid ? {} : {'item-count': 'Must be integer'};
      }
    }));
  }
};
