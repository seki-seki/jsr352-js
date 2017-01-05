'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
var properties = require('./implementation/CustomProperties'),
        elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
        cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');
var is = require('bpmn-js/lib/util/ModelUtil').is;

module.exports = function (group, element, bpmnFactory) {

    if (is(element, 'bpmn:Task')) {
        group.entries.push(entryFactory.selectBox({
            id: 'batchlet or chunk',
            description: 'Select batchlet or chunk',
            label: 'batchlet or chunk',
            modelProperty: 'batchletOrChunk',
            selectOptions: [{name: '', value: ''}, {name: 'batchlet', value: 'batchlet'}, {name: 'chunk', value: 'chunk'}]
        }));
        var failEntry = properties(element, bpmnFactory, {
            id: 'fails',
            modelProperties: ['on', 'exit-status'],
            labels: ['on', 'exit-status'],
            addLabel: 'fail',
            label: 'jsr352:fail',
            parentLabel: 'jsr352:fails',
            getParent: function (element, node, bo) {
                return bo.extensionElements;
            },
            createParent: function (element, bo) {
                var parent = elementHelper.createElement('bpmn:ExtensionElements', {values: []}, bo, bpmnFactory);
                var cmd = cmdHelper.updateBusinessObject(element, bo, {extensionElements: parent});
                return {
                    cmd: cmd,
                    parent: parent
                };
            }
        });
    }
};
