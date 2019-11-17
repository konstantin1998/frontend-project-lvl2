import getObjFormat from './objDiffGenerator';
import getPlainFormat from './plainDiffGenerator';
import getJsonFormat from './jsonDiffGenerator';

const mapping = {
  plain: getPlainFormat,
  json: getJsonFormat,
  obj: getObjFormat,
};

const renderDiff = (fileDifference, format) => mapping[format](fileDifference);

export default renderDiff;
