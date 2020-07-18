export default function splitNamesAndSorts(array, numSortStatements) {
  const names = [];
  const sorts = [];
  const sortSize = numSortStatements * 2 + 10;

  array.forEach((element) => {
    if (element.length) {
      const nameFragment = element.slice(0, 8);
      names.push(nameFragment);
      const sortFragment = element.slice(10, sortSize);
      sorts.push(sortFragment);
    }
  });

  return [names, sorts];
}
