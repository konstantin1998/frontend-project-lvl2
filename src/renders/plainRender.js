import _ from 'lodash';

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

const getPropPath = (key, propPath) => {
  if (propPath === '') {
    return `${key}`;
  }
  return `${propPath}.${key}`;
};

const getFormattedValue = (arg) => {
  if (isObj(arg)) {
    return '[complex value]';
  }
  if (typeof arg === 'string') {
    return `'${arg}'`;
  }
  return arg;
};

const render = (object) => {
  const objToLines = (obj, propPath = '') => {
    const keys = Object.getOwnPropertyNames(obj);

    const result = keys.reduce((acc, key) => {
      const objToAnalyze = obj[key];

      if (objToAnalyze.lastNested) {
        const propName = getPropPath(key, propPath);

        if ((objToAnalyze.prevVal !== undefined) && (objToAnalyze.newVal !== undefined)) {
          if (_.isEqual(objToAnalyze.prevVal, objToAnalyze.newVal)) {
            return acc;
          }
          const prevValue = getFormattedValue(objToAnalyze.prevVal);
          const newValue = getFormattedValue(objToAnalyze.newVal);
          return _.concat(acc, `Property '${propName}' was updated. From ${prevValue} to ${newValue}`);
        }
        if (objToAnalyze.prevVal === undefined) {
          const newValue = getFormattedValue(objToAnalyze.newVal);
          return _.concat(acc, `Property '${propName}' was added with value: ${newValue}`);
        }
        if (objToAnalyze.newVal === undefined) {
          return _.concat(acc, `Property '${propName}' was removed`);
        }
      }

      const updatedPropPath = getPropPath(key, propPath);
      return _.concat(acc, objToLines(obj[key], updatedPropPath));
    }, []);

    return result;
  };

  return objToLines(object).join('\n');
};

export default render;
