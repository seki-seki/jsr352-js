'use strict';

var inherits = require('inherits'),
    isObject = require('lodash/lang/isObject');

var BaseRenderer = require('diagram-js/lib/draw/BaseRenderer');

var componentsToPath = require('diagram-js/lib/util/RenderUtil').componentsToPath,
    createLine = require('diagram-js/lib/util/RenderUtil').createLine,
    TextUtil = require('diagram-js/lib/util/Text');

var svgAppend = require('tiny-svg/lib/append'),
    svgAttr = require('tiny-svg/lib/attr'),
    svgCreate = require('tiny-svg/lib/create');

var LABEL_STYLE = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '12px'
};

/**
 * A renderer that knows how to render custom elements.
 */
function CustomRenderer(eventBus, styles, bpmnRenderer) {

  BaseRenderer.call(this, eventBus, 2000);

  var computeStyle = styles.computeStyle;
  var textUtil = new TextUtil({
    style: LABEL_STYLE,
    size: { width: 100 }
  });

  this.renderLabel = function(p, label, options) {
    return textUtil.createText(p, label || '', options);
  }

  this.drawRect = function(parentGfx, width, height, r, offset, attrs) {
    if (isObject(offset)) {
      attrs = offset;
      offset = 0;
    }

    offset = offset || 0;

    attrs = computeStyle(attrs, {
      stroke: 'black',
      strokeWidth: 2,
      fill: 'white'
    });

    var rect = svgCreate('rect');
    svgAttr(rect, {
      x: offset,
      y: offset,
      width: width - offset * 2,
      height: height - offset * 2,
      rx: r,
      ry: r
    });
    svgAttr(rect, attrs);

    svgAppend(parentGfx, rect);

    return rect;
  }

  this.drawShapeByType = function(p, element, type) {
    var h = bpmnRenderer.handlers[type];
    return h(p, element);
  };

  this.getCustomConnectionPath = function(connection) {
    var waypoints = connection.waypoints.map(function(p) {
      return p.original || p;
    });

    var connectionPath = [
      ['M', waypoints[0].x, waypoints[0].y]
    ];

    waypoints.forEach(function(waypoint, index) {
      if (index !== 0) {
        connectionPath.push(['L', waypoint.x, waypoint.y]);
      }
    });

    return componentsToPath(connectionPath);
  };

  this.getRoundRectPath = function(shape, borderRadius) {

    var x = shape.x,
        y = shape.y,
        width = shape.width,
        height = shape.height;

    var roundRectPath = [
      ['M', x + borderRadius, y],
      ['l', width - borderRadius * 2, 0],
      ['a', borderRadius, borderRadius, 0, 0, 1, borderRadius, borderRadius],
      ['l', 0, height - borderRadius * 2],
      ['a', borderRadius, borderRadius, 0, 0, 1, -borderRadius, borderRadius],
      ['l', borderRadius * 2 - width, 0],
      ['a', borderRadius, borderRadius, 0, 0, 1, -borderRadius, -borderRadius],
      ['l', 0, borderRadius * 2 - height],
      ['a', borderRadius, borderRadius, 0, 0, 1, borderRadius, -borderRadius],
      ['z']
    ];

    return componentsToPath(roundRectPath);
  };
}

inherits(CustomRenderer, BaseRenderer);

module.exports = CustomRenderer;

CustomRenderer.$inject = [ 'eventBus', 'styles', 'bpmnRenderer' ];


CustomRenderer.prototype.canRender = function(element) {
  return /^jsr352\:/.test(element.type);
};

CustomRenderer.prototype.drawShape = function(p, element) {
  var type = element.type;

  if (type === 'jsr352:BatchletStep') {
    var step = this.drawRect(p, element.width, element.height, 10, 0);
    this.renderLabel(p, element.businessObject.name, { box: element, align: 'center-middle', padding: 5 });
    this.renderLabel(p, "Batchlet", { box: element, align: 'center-top', padding: 5 });
    return step;
  }
  else if (type === 'jsr352:ChunkStep') {
    return this.drawRect(p, element.width, element.height, 10, 0);
  }
  else if (type === 'jsr352:Flow') {
    return this.drawShapeByType(p, element, 'bpmn:SubProcess');
  } else if (type === 'jsr352:Split') {
    return this.drawShapeByType(p, element, 'bpmn:Participant');
  }
};

CustomRenderer.prototype.getShapePath = function(shape) {
  var type = shape.type;

  if (type === 'jsr352:BatchletStep') {
    return this.getRoundRectPath(shape, 10);
  }
  else if (type === 'jsr352:ChunkStep') {
    return this.getRoundRectPath(shape, 10);
  }
  else if (type === 'jsr352:Flow') {
    return this.getRoundRectPath(shape, 10);
  } else if (type === 'jsr352:Split') {
    return this.getRoundRectPath(shape, 10);
  }
};

CustomRenderer.prototype.drawConnection = function(p, element) {
  var type = element.type;

  if (type === 'jsr352:Transition') {
    var transition = this.drawShapeByType(p, element, 'bpmn:SequenceFlow');
    return transition;
  }
};


CustomRenderer.prototype.getConnectionPath = function(connection) {

  var type = connection.type;

  if (type === 'jsr352:Transition') {
    return this.getCustomConnectionPath(connection);
  }
};
