'use strict';

function SelectOptionUtil() {}

SelectOptionUtil.toSelectOption = function(array){
    return [{name:"" ,value:""}].concat(array.map(function(value) {return {name: value, value: value};}));
};

module.exports = SelectOptionUtil;
