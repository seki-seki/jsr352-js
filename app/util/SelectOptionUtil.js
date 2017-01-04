'use strict';

function SelectOptionUtil() {}

SelectOptionUtil.toSelectOption = function(array){
    console.log(array.map(function(value) {return {name: value, value: value};}));
    return array.map(function(value) {return {name: value, value: value};});
};

module.exports = SelectOptionUtil;
