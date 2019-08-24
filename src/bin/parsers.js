const yaml = require('js-yaml');
const ini = require('ini');

const parse = (content, extansion) => {
  const resultContainer = { result: {} };

  if (extansion === '.json') {
    resultContainer.result = JSON.parse(content);
  }
  if (extansion === '.yml') {
    resultContainer.result = yaml.safeLoad(content);
  }
  if (extansion === '.ini') {
    resultContainer.result = ini.parse(content);
  }
  return resultContainer.result;
};

export default parse;
