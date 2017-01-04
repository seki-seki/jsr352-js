'use strict';

var properties = require('./implementation/CustomProperties'),
        elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
        cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');


module.exports = function (group, element, bpmnFactory) {

    var nextEntry = properties(element, bpmnFactory, {
        id: 'next',
        modelProperties: ['on', 'to'],
        labels: ['on', 'to'],
        addLabel: 'next',
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

    var failEntry = properties(element, bpmnFactory, {
        id: 'fail',
        modelProperties: ['on', 'exit-status'],
        labels: ['on', 'exit-status'],
        addLabel: 'fail',
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

    var endEntry = properties(element, bpmnFactory, {
        id: 'end',
        modelProperties: ['on', 'exit-status'],
        labels: ['on', 'exit-status'],
        addLabel: 'end',
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

    var stopEntry = properties(element, bpmnFactory, {
        id: 'stop',
        modelProperties: ['on', 'exit-status' , 'restartable'],
        labels: ['on', 'exit-status', 'restartable'],
        addLabel: 'stop',
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

    group.entries.push(nextEntry);
    group.entries.push(failEntry);
    group.entries.push(endEntry);
    group.entries.push(stopEntry);

};
