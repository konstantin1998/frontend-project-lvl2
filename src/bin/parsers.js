const yaml = require('js-yaml');

const parse = (content, extansion) => {
  const result = {};

  if (extansion === '.json') {
    result = JSON.parse(content);
  }
  if (extansion === '.yml') {
    result = yaml.safeLoad(content);
  }
  return result;
};

export default parse;
