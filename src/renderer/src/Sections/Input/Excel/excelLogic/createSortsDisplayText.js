const createSortsDisplayText = (
  participantNames: string[],
  participantSorts: number[]
) => {
  return participantNames.map(function (item, i) {
    return item + ": " + participantSorts[i];
  });
};

export default createSortsDisplayText;
