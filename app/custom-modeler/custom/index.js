module.exports = {
  __init__: [ 'customRenderer', 'paletteProvider', 'customUpdater', 'contextPadProvider' ],
  elementFactory: [ 'type', require('./CustomElementFactory') ],
  customRenderer: [ 'type', require('./CustomRenderer') ],
  paletteProvider: [ 'type', require('./CustomPalette') ],
  bpmnRules: [ 'type', require('./CustomRules') ],
  customUpdater: [ 'type', require('./CustomUpdater') ],
  contextPadProvider: [ 'type', require('./CustomContextPadProvider') ]
};
