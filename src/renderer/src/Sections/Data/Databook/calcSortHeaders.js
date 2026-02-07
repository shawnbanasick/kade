import uniq from 'lodash/uniq';

const calcSortHeaders = (qSortPattern) => {
  const newArray = uniq([...qSortPattern]);
  return newArray;
};

export default calcSortHeaders;
