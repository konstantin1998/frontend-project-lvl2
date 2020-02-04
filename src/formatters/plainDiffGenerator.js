import _ from 'lodash';

const getFormattedValue = (arg) => {
  if (_.isPlainObject(arg)) {
    return '[complex value]';
  }
  if (typeof arg === 'string') {
    return `'${arg}'`;
  }
  return arg;
};

const iter = (fileDifference, path = []) => {
  const passThrowTree = (item) => {
    const newPath = path.concat(item.name);
    switch (item.type) {
      case 'changed': {
        return `Property '${newPath.join('.')}' was updated. From ${getFormattedValue(item.valueBefore)} to ${getFormattedValue(item.valueAfter)}`;
      }
      case 'added': {
        return `Property '${newPath.join('.')}' was added with value: ${getFormattedValue(item.value)}`;
      }
      case 'deleted': {
        return `Property '${newPath.join('.')}' was removed`;
      }
      case 'unchanged': {
        return null;
      }
      case 'parent': {
        return iter(item.children, newPath);
      }
      default:
        throw new Error('exeption in  function iter from objDiffGenerator.js');
    }
  };

  return fileDifference.map(passThrowTree).filter(item => !(item === null)).join('\n');
};

const generateDiff = fileDifference => iter(fileDifference);

export default generateDiff;
