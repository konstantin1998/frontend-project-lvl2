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

const generateDiff = (fileDifference, path = []) => {
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
        return generateDiff(item.children, newPath);
      }
      default:
        throw new Error('error');
    }
  };

  return fileDifference.map(passThrowTree).filter(item => !(item === null)).join('\n');
};

export default generateDiff;
