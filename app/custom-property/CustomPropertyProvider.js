'use strict';


var inherits = require('inherits');
var is = require('bpmn-js/lib/util/ModelUtil').is;

var PropertiesActivator = require('bpmn-js-properties-panel/lib/PropertiesActivator');

// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
var processProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps'),
        eventProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps'),
        linkProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps'),
        documentationProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps'),
        idProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps'),
        properties = require('bpmn-js-properties-panel/lib/provider/camunda/parts/PropertiesProps'),
        nameProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps');


// Require your custom property entries.
var jobProps = require('./parts/JobProps'),
        batchletOrChunkProps = require('./parts/BatchletOrChunkProps'),
        batchletProps = require('./parts/BatchletProps');

// The general tab contains all bpmn relevant properties.
// The properties are organized in groups.
function createGeneralTabGroups(element, bpmnFactory, elementRegistry) {

    var generalGroup = {
        id: 'general',
        label: 'General',
        entries: []
    };
    idProps(generalGroup, element, elementRegistry);
    nameProps(generalGroup, element);

    var detailsGroup = {
        id: 'details',
        label: 'Details',
        entries: []
    };
    linkProps(detailsGroup, element);
    eventProps(detailsGroup, element, bpmnFactory, elementRegistry);

    var documentationGroup = {
        id: 'documentation',
        label: 'Documentation',
        entries: []
    };

    documentationProps(documentationGroup, element, bpmnFactory);

    return[
        generalGroup,
        detailsGroup,
        documentationGroup
    ];
}

function createExtensionElementsGroups(element, bpmnFactory, elementRegistry) {

    var propertiesGroup = {
        id: 'extensionElements-properties',
        label: 'Properties',
        entries: [],
        enabled: function (element) {
            return is(element, 'bpmn:Task') || is(element, 'bpmn:Participant');
        }
    };
    properties(propertiesGroup, element, bpmnFactory);

    return [
        propertiesGroup
    ];
}

// Create the custom Custom tab
function createJobTabGroups(element, elementRegistry) {

    var JobGroup = {
        id: 'Job',
        lable: 'Job',
        entries: []
    };
    jobProps(JobGroup, element);

    return [
        JobGroup
    ];
}

function createStepTabGroups(element, elementRegistry) {

    var StepGroup = {
        id: 'Step',
        label: 'Step',
        entries: []
    };

    batchletOrChunkProps(StepGroup, element);
    batchletProps(StepGroup, element);


    return [
        StepGroup
    ];
}
function CustomPropertiesProvider(eventBus, bpmnFactory, elementRegistry) {

    PropertiesActivator.call(this, eventBus);

    this.getTabs = function (element) {

        var generalTab = {
            id: 'general',
            label: 'General',
            groups: createGeneralTabGroups(element, bpmnFactory, elementRegistry)
        };
        var jobTab = {
            id: 'Job',
            label: 'Job',
            groups: createJobTabGroups(element, elementRegistry)
        };
        var stepTab = {
            id: 'Step',
            label: 'Step',
            groups: createStepTabGroups(element, elementRegistry)
        };
        var extensionsTab = {
            id: 'PropertyElements',
            label: 'Properties',
            groups: createExtensionElementsGroups(element, bpmnFactory, elementRegistry)
        };

        // Show general + "Custom" tab
        return [
            generalTab,
            stepTab,
            jobTab,
            extensionsTab
        ];
    };
}

inherits(CustomPropertiesProvider, PropertiesActivator);

module.exports = CustomPropertiesProvider;
