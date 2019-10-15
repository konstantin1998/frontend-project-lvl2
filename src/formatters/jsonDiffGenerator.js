import getDifference from './getDifference';

const diffGenerator = (fileBeforePath, fileAfterPath) => {
  const diffObj = getDifference(fileBeforePath, fileAfterPath);
  return JSON.stringify(diffObj); // diffObj;
};

export default diffGenerator;
