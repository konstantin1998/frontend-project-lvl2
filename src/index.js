import objFormatCompare from './formatters/objDiffGenerator';
import plainFormatCompare from './formatters/plainDiffGenerator';
import jsonFormatCompare from './formatters/jsonDiffGenerator';
import getDifference from './getDifference';

const mapping = {
  plain: plainFormatCompare,
  json: jsonFormatCompare,
  obj: objFormatCompare,
};

const compare = (fileBeforePath, fileAfterPath, format) => {
  const fileDifference = getDifference(fileBeforePath, fileAfterPath);
  return mapping[format](fileDifference);
};

export default compare;
