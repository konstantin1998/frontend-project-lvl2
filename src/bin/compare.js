import parse from './parsers';
import render from './render';

const fs = require('fs');
const _ = require('lodash');
const path = require('path');

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

const differenceItem = (objBefore, objAfter, key) => {
  if (_.has(objBefore, key) && _.has(objAfter, key)) {
    if (objBefore[key] === objAfter[key]) {
      const diff = {};
      diff[`  ${key}`] = objBefore[key];
      return diff;
    }

    const diff = {};
    diff[`- ${key}`] = objBefore[key];
    diff[`+ ${key}`] = objAfter[key];
    return diff;
  }

  if (_.has(objBefore, key)) {
    const diff = {};
    diff[`- ${key}`] = objBefore[key];
    return diff;
  }

  const diff = {};
  diff[`+ ${key}`] = objAfter[key];
  return diff;
};

const isPlainKey = (obj1, obj2, key) => {
  if (_.has(obj1, key) && _.has(obj2, key)) {
    if (isObj(obj1[key]) && isObj(obj2[key])) {
      return false;
    }
  }
  return true;
};

const comparator = (fileBeforePath, fileAfterPath) => {
  const fileBeforeExt = path.extname(path.basename(fileBeforePath));
  const fileAfterExt = path.extname(path.basename(fileAfterPath));

  if (fileBeforeExt !== fileAfterExt) {
    throw new Error('error: arguments must have the same extansion');
  }

  const fileBeforeContent = fs.readFileSync(fileBeforePath).toString();
  const fileAfterContent = fs.readFileSync(fileAfterPath).toString();
  const objBefore = parse(fileBeforeContent, fileBeforeExt);
  const objAfter = parse(fileAfterContent, fileAfterExt);

  const formDiff = (before, after) => {
    const allKeys = _.concat(Object.keys(before), Object.keys(after));
    const keys = _.uniq(allKeys);

    const resultObj = keys.reduce((acc, key) => {
      if (isPlainKey(before, after, key)) {
        return { ...acc, ...differenceItem(before, after, key) };
      }
      acc[`  ${key}`] = formDiff(before[key], after[key]);
      return acc;
    }, {});

    return resultObj;
  };

  const diffObj = formDiff(objBefore, objAfter);
  return render(diffObj);
};

export default comparator;
