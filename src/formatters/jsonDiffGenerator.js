import _ from 'lodash';

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

const passThroughTree = (acc, item) => {
  if (_.isArray(item)) {
    return item.reduce(passThroughTree, acc);
  }
  return _.set(acc, item.path.join('.'), mapping[item.type](item));
};

const diffGenerator = fileDifference => JSON.stringify(fileDifference.reduce(passThroughTree, {}));

export default diffGenerator;
