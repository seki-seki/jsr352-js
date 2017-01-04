'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
var componentProvider = require('../../util/ComponentProvider');
var selectOptionUtil = require('../../util/SelectOptionUtil');
module.exports = function(group, element) {
  if (element.businessObject.batchletOrChunk === "chunk") {
    group.entries.push(entryFactory.selectBox({
      id : 'reader compornent',
      description : 'reader compornent ref',
      label : 'reader compornent ref',
      modelProperty : 'readerRef',
      selectOptions : selectOptionUtil.toSelectOption(componentProvider.getItemReaders())
    }));
    group.entries.push(entryFactory.selectBox({
      id : 'processor compornent',
      description : 'processor compornent ref',
      label : 'processor compornent ref',
      modelProperty : 'processorRef',
      selectOptions : selectOptionUtil.toSelectOption(componentProvider.getItemProcessors())
    }));
    group.entries.push(entryFactory.selectBox({
      id : 'writer compornent',
      description : 'writer compornent ref',
      label : 'writer compornent ref',
      modelProperty : 'writerRef',
      selectOptions : selectOptionUtil.toSelectOption(componentProvider.getItemWriters())
    }));
  }
};
