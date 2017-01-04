'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
var componentProvider = require('../../util/ComponentProvider');
var selectOptionUtil = require('../../util/SelectOptionUtil');
module.exports = function(group, element) {
  if (element.businessObject.batchletOrChunk === "batchlet") {
    group.entries.push(entryFactory.selectBox({
      id : 'batchlet compornent',
      description : 'batchlet compornent ref',
      label : 'batchlet compornent ref',
      modelProperty : 'batchletRef',
      selectOptions : selectOptionUtil.toSelectOption(componentProvider.getBatchlets())
    }));
  }
};
