import isEqual from 'lodash/isEqual';

const quinceCheckForUnforced = (testSortArray) => {
  let passesTest = true;

  if (
    testSortArray.length === 0 ||
    !Array.isArray(testSortArray) ||
    testSortArray[0].length === 0
  ) {
    console.error('quinceCheckForUnforced: testSortArray is empty or invalid');
    passesTest = false;
    return false;
  }

  const first = [...testSortArray[0][0]].sort((a, b) => a - b).map(Number);

  return testSortArray[0].every((item, index) => {
    const sortedItem = [...item].sort((a, b) => a - b).map(Number);
    const same = isEqual(first, sortedItem);
    if (!same) {
      console.log('unforcedTest failed for index:', index);
      return same;
    }
    return same;
  });
};

export default quinceCheckForUnforced;
