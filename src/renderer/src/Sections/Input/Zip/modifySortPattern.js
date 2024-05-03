const modifySortPattern = sortPattern => {
  let sortPattern2 = sortPattern[0].map((element, index) => {
    if (index === 0) {
      return parseInt(element, 10);
    } else {
      return element;
    }
  });

  return sortPattern2;
};

export default modifySortPattern;
