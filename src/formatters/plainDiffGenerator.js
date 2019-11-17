import _ from 'lodash';

const getPropPath = (key, propPath) => {
  if (propPath === '') {
    return `${key}`;
  }
  return `${propPath}.${key}`;
};

const getFormattedValue = (arg) => {
  if (_.isPlainObject(arg)) {
    return '[complex value]';
  }
  if (typeof arg === 'string') {
    return `'${arg}'`;
  }
  return arg;
};

const isPlainNode = node => node.lastNested;

const diffGenerator = (fileDifference) => {
  const objToLines = (object, propPath = '') => {
    const keys = Object.getOwnPropertyNames(object);
    const mapping = {
      unchanged: () => '',
      changed: (obj, propName) => {
        const message = `Property '${propName}' was updated. From ${getFormattedValue(obj.valueBefore)} to ${getFormattedValue(obj.valueAfter)}`;
        return message;
      },
      deleted: (obj, propName) => {
        const message = `Property '${propName}' was removed`;
        return message;
      },
      added: (obj, propName) => {
        const message = `Property '${propName}' was added with value: ${getFormattedValue(obj.value)}`;
        return message;
      },
    };

    const result = keys.reduce((acc, key) => {
      const objToAnalyze = object[key];

      if (isPlainNode(objToAnalyze)) {
        const propName = getPropPath(key, propPath);
        return _.concat(acc, mapping[objToAnalyze.type](objToAnalyze, propName));
      }

      const updatedPropPath = getPropPath(key, propPath);
      return _.concat(acc, objToLines(object[key], updatedPropPath));
    }, []);

    return result;
  };

  return _.compact(objToLines(fileDifference)).join('\n');
};

export default diffGenerator;
