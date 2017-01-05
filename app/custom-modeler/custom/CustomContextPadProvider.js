'use strict';

var inherits = require('inherits');

var ContextPadProvider = require('bpmn-js/lib/features/context-pad/ContextPadProvider');

var isAny = require('bpmn-js/lib/features/modeling/util/ModelingUtil').isAny;

var assign = require('lodash/object/assign'),
    pick = require('lodash/object/pick'),
    bind = require('lodash/function/bind');

function CustomContextPadProvider(eventBus, contextPad, modeling, elementFactory, connect,
                                  create, popupMenu, canvas, rules, translate) {

  ContextPadProvider.call(this, eventBus, contextPad, modeling, elementFactory, connect, create,
                    popupMenu, canvas, rules, translate);

  var cached = bind(this.getContextPadEntries, this);

  this.getContextPadEntries = function(element) {
    var actions = cached(element);

    var businessObject = element.businessObject;

    function startConnect(event, element, autoActivate) {
      connect.start(event, element, autoActivate);
    }

    function appendAction(type, className, title, options) {

      if (typeof title !== 'string') {
        options = title;
        title = translate('Append {type}', { type: type.replace(/^jsr352\:/, '') });
      }

      function appendListener(event, element) {
        var shape = elementFactory.createShape(assign({ type: type, isExpanded: true }, options));
        create.start(event, shape, element);
      }

      return {
        group: 'model',
        className: className,
        title: title,
        action: {
          dragstart: appendListener,
          click: appendListener
        }
      };
    }

    function appendBatchComponentMenu(actions) {
      assign(actions, {
        'append.batchlet-step': appendAction('jsr352:BatchletStep', 'icon-jsr352-batchlet-step', 'Append batchlet step'),
        'append.chunk-step': appendAction('jsr352:ChunkStep', 'icon-jsr352-chunk-step', 'Append chunk step'),
        'append.end-event': appendAction('bpmn:EndEvent', 'bpmn-icon-end-event-none'),
        'connect': {
          group: 'connect',
          className: 'bpmn-icon-connection-multi',
          title: translate('Connect using DataInputAssociation'),
          action: {
            click: startConnect,
            dragstart: startConnect
          }
        }
      });
    }

    if (isAny(businessObject, ['jsr352:ChunkStep', 'jsr352:BatchletStep', 'jsr352:Flow'])) {
      actions = pick(actions, ['connect', 'delete']);
      appendBatchComponentMenu(actions);
    } else if (isAny(businessObject, ['bpmn:StartEvent'])) {
      actions = pick(actions, ['connect', 'delete']);
      appendBatchComponentMenu(actions);
    }

    return actions;
  };
}

inherits(CustomContextPadProvider, ContextPadProvider);

CustomContextPadProvider.$inject = [
  'eventBus',
  'contextPad',
  'modeling',
  'elementFactory',
  'connect',
  'create',
  'popupMenu',
  'canvas',
  'rules',
  'translate'
];

module.exports = CustomContextPadProvider;
