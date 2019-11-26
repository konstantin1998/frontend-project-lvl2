import _ from 'lodash';

const diffGenerator = (fileDifference) => {
  const mapping = {
    unchanged: item => ({ type: item.type, value: item.value }),
    changed: item => ({
      type: item.type,
      valueBefore: item.valueBefore,
      valueAfter: item.valueAfter,
    }),
    deleted: item => ({ type: item.type, value: item.value }),
    added: item => ({ type: item.type, value: item.value }),
  };
  return JSON.stringify(
    fileDifference.reduce((acc, item) => _.set(acc, item.path, mapping[item.type](item)), {}),
  );
};

export default diffGenerator;
