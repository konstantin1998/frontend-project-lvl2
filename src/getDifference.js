import _ from 'lodash';

const differenceItem = (objBefore, objAfter, key, path) => {
  if (_.has(objBefore, key) && _.has(objAfter, key)) {
    if (objBefore[key] === objAfter[key]) {
      return {
        path, type: 'unchanged', value: objBefore[key],
      };
      // _.fromPairs([[`${key}`, { type: 'unchanged', value: objBefore[key], lastNested: true }]]);
    }
    if (objBefore[key] !== objAfter[key]) {
      return {
        path,
        type: 'changed',
        valueBefore: objBefore[key],
        valueAfter: objAfter[key],
      };
    }
  }

  if (_.has(objBefore, key)) {
    return {
      path, type: 'deleted', value: objBefore[key],
    };
  }
  return {
    path, type: 'added', value: objAfter[key],
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
  const formDiff = (before, after, path = '') => {
    const keys = _.union(_.keys(before), _.keys(after));

    const resultObj = keys.reduce((acc, key) => {
      const updatedPath = (path === '') ? `${key}` : `${path}.${key}`;
      if (isPlainNode(before, after, key)) {
        return _.concat(acc, differenceItem(before, after, key, updatedPath));
        // { ...acc, ...differenceItem(before, after, key, updatedPath) };
      }

      return _.concat(acc, formDiff(before[key], after[key], updatedPath));
      // { ...acc, ..._.fromPairs([[`${key}`, formDiff(before[key], after[key])]]) };
    }, []);

    return resultObj;
  };

  return formDiff(objBefore, objAfter);
};

export default getDifference;
