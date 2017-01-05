'use strict';

var properties = require('./implementation/CustomProperties'),
        elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
        cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');


module.exports = function (group, element, bpmnFactory) {

    var nextEntry = properties(element, bpmnFactory, {
        id: 'Nexts',
        modelProperties: ['on', 'to'],
        labels: ['on', 'to'],
        addLabel: 'Next',
        label: 'jsr352:Next',
        parentLabel:'jsr352:Nexts',
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
        id: 'Fails',
        modelProperties: ['on', 'exit-status'],
        labels: ['on', 'exit-status'],
        addLabel: 'Fail',
        label: 'jsr352:Fail',
        parentLabel:'jsr352:Fails',
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
        id: 'Ends',
        modelProperties: ['on', 'exit-status'],
        labels: ['on', 'exit-status'],
        addLabel: 'End',
        label: 'jsr352:End',
        parentLabel:'jsr352:Ends',
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
        id: 'Stops',
        modelProperties: ['on', 'exit-status' , 'restartable'],
        labels: ['on', 'exit-status', 'restartable'],
        addLabel: 'Stop',
        label: 'jsr352:Stop',
        parentLabel:'jsr352:Stops',
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
