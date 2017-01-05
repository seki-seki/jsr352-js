'use strict';

var properties = require('./implementation/CustomProperties'),
        elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
        cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');


module.exports = function (group, element, bpmnFactory) {

    var nextEntry = properties(element, bpmnFactory, {
        id: 'nexts',
        modelProperties: ['on', 'to'],
        labels: ['on', 'to'],
        addLabel: 'next',
        label: 'jsr352:next',
        parentLabel:'jsr352:nexts',
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
        id: 'fails',
        modelProperties: ['on', 'exit-status'],
        labels: ['on', 'exit-status'],
        addLabel: 'fail',
        label: 'jsr352:fail',
        parentLabel:'jsr352:fails',
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
        id: 'ends',
        modelProperties: ['on', 'exit-status'],
        labels: ['on', 'exit-status'],
        addLabel: 'end',
        label: 'jsr352:end',
        parentLabel:'jsr352:ends',
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
        id: 'stops',
        modelProperties: ['on', 'exit-status' , 'restartable'],
        labels: ['on', 'exit-status', 'restartable'],
        addLabel: 'stop',
        label: 'jsr352:stop',
        parentLabel:'jsr352:stops',
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
