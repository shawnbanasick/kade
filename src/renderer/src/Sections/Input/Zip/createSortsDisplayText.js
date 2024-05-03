const createSortsDisplayText = (participantNames, participantSorts) => {
  return participantNames.map(function(item, i) {
    return item + ": " + participantSorts[i];
  });
};

export default createSortsDisplayText;
