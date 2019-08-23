const yaml = require('js-yaml');

const parse = (content, extansion) => {
  const resultContainer = { result: {} };

  if (extansion === '.json') {
    resultContainer.result = JSON.parse(content);
  }
  if (extansion === '.yml') {
    resultContainer.result = yaml.safeLoad(content);
  }
  return resultContainer.result;
};

export default parse;
