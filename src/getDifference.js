import _ from 'lodash';

/* const differenceItem = (objBefore, objAfter, key) => {
  const prevVal = objBefore[key];
  const newVal = objAfter[key];
  return _.fromPairs([[`${key}`, { prevVal, newVal, lastNested: true }]]);
}; */
const differenceItem = (objBefore, objAfter, key) => {
  if (_.has(objBefore, key) && _.has(objAfter, key)) {
    if (objBefore[key] === objAfter[key]) {
      return _.fromPairs([[`${key}`, { type: 'unchanged', value: objBefore[key], lastNested: true }]]);
    }
    if (objBefore[key] !== objAfter[key]) {
      return _.fromPairs([[`${key}`, {
        type: 'changed', valueBefore: objBefore[key], valueAfter: objAfter[key], lastNested: true,
      }]]);
    }
  }

  if (_.has(objBefore, key)) {
    return _.fromPairs([[`${key}`, { type: 'deleted', value: objBefore[key], lastNested: true }]]);
  }
  return _.fromPairs([[`${key}`, { type: 'added', value: objAfter[key], lastNested: true }]]);
};

const isPlainKey = (obj1, obj2, key) => {
  if (_.has(obj1, key) && _.has(obj2, key)) {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return false;
    }
  }
  return true;
};

const getDifference = (objBefore, objAfter) => {
  const formDiff = (before, after) => {
    const keys = _.union(_.keys(before), _.keys(after));

    const resultObj = keys.reduce((acc, key) => {
      if (isPlainKey(before, after, key)) {
        return { ...acc, ...differenceItem(before, after, key) };
      }


      return { ...acc, ..._.fromPairs([[`${key}`, formDiff(before[key], after[key])]]) };
    }, {});

    return resultObj;
  };

  return formDiff(objBefore, objAfter);
};

export default getDifference;
