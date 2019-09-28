import objFormatCompare from './formatters/objDiffGenerator';
import plainFormatCompare from './formatters/plainDiffGenerator';
import jsonFormatCompare from './formatters/jsonDiffGenerator';

const compare = (fileBeforePath, fileAfterPath, format) => {
  if (format === 'plain') {
    return plainFormatCompare(fileBeforePath, fileAfterPath);
  }
  if (format === 'json') {
    return jsonFormatCompare(fileBeforePath, fileAfterPath);
  }
  return objFormatCompare(fileBeforePath, fileAfterPath);
};

export default compare;
