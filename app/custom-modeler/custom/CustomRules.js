'use strict';

var reduce = require('lodash/collection/reduce'),
    inherits = require('inherits');

var is = require('bpmn-js/lib/util/ModelUtil').is,
    isAny = require('bpmn-js/lib/features/modeling/util/ModelingUtil').isAny;

var BpmnRules = require('bpmn-js/lib/features/rules/BpmnRules');

var HIGH_PRIORITY = 1500;


function isCustom(element) {
  return element && /^jsr352\:/.test(element.type);
}

/**
 * Specific rules for custom elements
 */
function CustomRules(eventBus) {
  BpmnRules.call(this, eventBus);
}

inherits(CustomRules, BpmnRules);

CustomRules.$inject = [ 'eventBus' ];

module.exports = CustomRules;

/**
 * Can source and target be connected?
 */
function canConnect(source, target) {

  // only judge about custom elements
  if (!isCustom(source) && !isCustom(target)) {
    return {};
  }

  // allow connection between custom shape and task
  if (isCustom(source)) {
    if (isAny(target, ['jsr352:BatchComponent', 'bpmn:EndEvent', 'bpmn:IntermediateEvent'])) {
      return {type: 'jsr352:Transition'};
    } else {
      return false;
    }
  } else if (isCustom(target)) {
    if (isAny(source, ['jsr352:BatchComponent', 'bpmn:StartEvent'])) {
      return {type: 'jsr352:Transition'};
    } else {
      return false;
    }
  }
};

CustomRules.prototype.init = function() {

  /**
   * Can shape be created on target container?
   */
  function canCreate(shape, target) {
    // only judge about custom elements
    if (!isCustom(shape) || !target) {
      return;
    }

    if (isAny(shape, ['jsr352:BatchletStep', 'jsr352:ChunkStep'])) {
      return isAny(target, ['jsr352:Flow', 'bpmn:Process', 'bpmn:Participant', 'bpmn:Collaboration']);
    } else if (is(shape, 'jsr352:Flow')) {
      return isAny(target, ['jsr352:Split', 'bpmn:Process', 'bpmn:Participant', 'bpmn:Collaboration']);
    } else {
      return isAny(target, ['bpmn:Process', 'bpmn:Participant', 'bpmn:Collaboration']);
    }
  }

  this.addRule('elements.move', HIGH_PRIORITY, function(context) {

    var target = context.target,
        shapes = context.shapes;

    var type;

    // do not allow mixed movements of custom / BPMN shapes
    // if any shape cannot be moved, the group cannot be moved, too
    var allowed = reduce(shapes, function(result, s) {
      if (type === undefined) {
        type = isCustom(s);
      }

      if (type !== isCustom(s) || result === false) {
        return false;
      }

      return canCreate(s, target);
    }, undefined);

    // reject, if we have at least one
    // custom element that cannot be moved
    return allowed;
  });

  this.addRule('shape.create', HIGH_PRIORITY, function(context) {
    var target = context.target,
        shape = context.shape;

    return canCreate(shape, target);
  });

  this.addRule('shape.resize', HIGH_PRIORITY, function(context) {
    var shape = context.shape;

    if (isCustom(shape)) {
      // cannot resize custom elements
      return false;
    }
  });

  this.addRule('connection.create', HIGH_PRIORITY, function(context) {
    var source = context.source,
        target = context.target;

    return canConnect(source, target);
  });

  this.addRule('connection.reconnectStart', HIGH_PRIORITY, function(context) {
    var connection = context.connection,
        source = context.hover || context.source,
        target = connection.target;

    return canConnect(source, target, connection);
  });

  this.addRule('connection.reconnectEnd', HIGH_PRIORITY, function(context) {
    var connection = context.connection,
        source = connection.source,
        target = context.hover || context.target;

    return canConnect(source, target, connection);
  });

};

CustomRules.prototype.canConnect = canConnect;
