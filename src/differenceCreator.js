import _ from 'lodash';

const differenceItem = (objBefore, objAfter, key) => {
  if (_.has(objBefore, key) && _.has(objAfter, key)) {
    if (objBefore[key] === objAfter[key]) {
      return {
        name: key,
        type: 'unchanged',
        value: objBefore[key],
      };
      // _.fromPairs([[`${key}`, { type: 'unchanged', value: objBefore[key], lastNested: true }]]);
    }
    if (objBefore[key] !== objAfter[key]) {
      return {
        name: key,
        type: 'changed',
        valueBefore: objBefore[key],
        valueAfter: objAfter[key],
      };
    }
  }

  if (_.has(objBefore, key)) {
    return {
      name: key,
      type: 'deleted',
      value: objBefore[key],
    };
  }
  return {
    name: key,
    type: 'added',
    value: objAfter[key],
  };
};

const isPlainNode = (obj1, obj2, node) => {
  if (_.has(obj1, node) && _.has(obj2, node)) {
    if (_.isPlainObject(obj1[node]) && _.isPlainObject(obj2[node])) {
      return false;
    }
  }
  return true;
};

const getDifference = (objBefore, objAfter) => {
  const formDiff = (before, after) => {
    const keys = _.union(_.keys(before), _.keys(after));

    const resultArray = keys.map((key) => {
      if (isPlainNode(before, after, key)) {
        return differenceItem(before, after, key);
      }

      return { name: `${key}`, children: formDiff(before[key], after[key]) };// formDiff(before[key], after[key], updatedPath);
    });

    return resultArray;
  };

  return formDiff(objBefore, objAfter);
};

export default getDifference;
