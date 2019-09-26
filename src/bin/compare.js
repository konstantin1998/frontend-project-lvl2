import objFormatCompare from '../formatters/objectFormat/diffGenerator';
import plainFormatCompare from '../formatters/plainFormat/diffGenerator';
import jsonFormatCompare from '../formatters/jsonFormat/diffGenerator';

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
