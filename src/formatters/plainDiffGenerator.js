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

const diffGenerator = (fileDifference) => {
  const mapping = {
    unchanged: () => '',
    changed: (item) => {
      const message = `Property '${item.path.join('.')}' was updated. From ${getFormattedValue(item.valueBefore)} to ${getFormattedValue(item.valueAfter)}`;
      return message;
    },
    deleted: (item) => {
      const message = `Property '${item.path.join('.')}' was removed`;
      return message;
    },
    added: (item) => {
      const message = `Property '${item.path.join('.')}' was added with value: ${getFormattedValue(item.value)}`;
      return message;
    },
  };
  const diff = fileDifference.map(item => mapping[item.type](item));
  return _.compact(diff).join('\n');
};

export default diffGenerator;
