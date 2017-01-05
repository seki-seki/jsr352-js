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
var stepProps = require('./parts/StepProps'),
    transitionProps = require('./parts/TransitionProps');

// The general tab contains all bpmn relevant properties.
// The properties are organized in groups.
function createGeneralTabGroups(element, bpmnFactory, elementRegistry) {
  var generalGroup = {
    id: 'general',
    label: 'General',
    entries: []
  };
  idProps(generalGroup, element, elementRegistry);
  if (!is(element, 'jsr352:Transition')) {
    nameProps(generalGroup, element);
  }
  stepProps(generalGroup, element);
  transitionProps(generalGroup, element);

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
    id : 'extensionElements-properties',
    label: 'Properties',
    entries: [],
    enabled: function(element) {
      return is(element, 'bpmn:Task') || is(element, 'bpmn:Participant')
        || is(element, 'jsr352:fail');
    }
  };
  properties(propertiesGroup, element, bpmnFactory);

  return [
    propertiesGroup
  ];
}

// Create the custom Custom tab
function createCustomTabGroups(element, elementRegistry) {

  var StepGroup = {
    id: 'Step',
    label: 'Step',
    entries: []
  };

  return [
    StepGroup
  ];
}

function CustomPropertiesProvider(eventBus, bpmnFactory, elementRegistry) {

  PropertiesActivator.call(this, eventBus);

  this.getTabs = function(element) {

    var generalTab = {
      id: 'general',
      label: 'General',
      groups: createGeneralTabGroups(element, bpmnFactory, elementRegistry)
    };

    // The "Step" tab
    var StepTab = {
      id: 'Custom',
      label: 'Custom',
      groups: createCustomTabGroups(element, elementRegistry)
    };
    var extensionsTab = {
      id: 'PropertyElements',
      label: 'Properties',
      groups: createExtensionElementsGroups(element, bpmnFactory, elementRegistry)
    };

    // Show general + "Custom" tab
    return [
      generalTab,
      StepTab,
      extensionsTab
    ];
  };
}

inherits(CustomPropertiesProvider, PropertiesActivator);

module.exports = CustomPropertiesProvider;
