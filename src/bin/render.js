#!/usr/bin/env node
const _ = require('lodash');

const isObj = (arg) => {
  if (typeof (arg) === 'string') {
    return false;
  }

  if (Array.isArray(arg) === true) {
    return false;
  }

  if (typeof (arg) === 'object') {
    return true;
  }

  return false;
};

const objToString = (object) => {
  // const acc = [];

  const objToLines = (obj, gap = '    ') => {
    const space = '    ';
    const keys = Object.getOwnPropertyNames(obj);

    const result = keys.reduce((acc, key) => {
      if (isObj(obj[key])) {
        // const gapForKey = ' '.repeat(`${key}:`.length);
        const newGap = `${gap}${space}`;
        return _.concat(acc, `${gap}${key}: {`, objToLines(obj[key], newGap), `${gap}}`);
      }
      return _.concat(acc, `${gap}${key}: ${obj[key]}`);
    }, []);

    return result;
  };

  return _.join(_.concat('{', objToLines(object), '}'), '\n');
};

export default objToString;
// console.log(objToString(testObj));
