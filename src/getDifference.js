import _ from 'lodash';

const differenceItem = (objBefore, objAfter, key) => {
  const prevVal = objBefore[key];
  const newVal = objAfter[key];
  return _.fromPairs([[`${key}`, { prevVal, newVal, lastNested: true }]]);
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
      acc[key] = formDiff(before[key], after[key]);
      return acc;
    }, {});

    return resultObj;
  };

  return formDiff(objBefore, objAfter);
};

export default getDifference;
