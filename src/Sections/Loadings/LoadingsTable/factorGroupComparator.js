const factorGroupComparator = function(fg1, fg2) {
  const factorGroup1 = +fg1.slice(1, 2);
  const factorGroup2 = +fg2.slice(1, 2);
  const subGroup1 = +fg1.slice(3);
  const subGroup2 = +fg2.slice(3);

  const comparison1 = factorGroup1 - factorGroup2;
  if (comparison1 !== 0) {
    return comparison1;
  }
  return subGroup1 - subGroup2;
};

export default factorGroupComparator;
