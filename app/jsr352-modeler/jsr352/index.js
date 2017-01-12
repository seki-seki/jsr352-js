module.exports = {
  __init__: [ 'customRenderer', 'paletteProvider', 'customUpdater', 'contextPadProvider' ],
  elementFactory: [ 'type', require('./JSR352ElementFactory') ],
  customRenderer: [ 'type', require('./JSR352Renderer') ],
  paletteProvider: [ 'type', require('./JSR352Palette') ],
  bpmnRules: [ 'type', require('./JSR352Rules') ],
  customUpdater: [ 'type', require('./JSR352Updater') ],
  contextPadProvider: [ 'type', require('./JSR352ContextPadProvider') ]
};
