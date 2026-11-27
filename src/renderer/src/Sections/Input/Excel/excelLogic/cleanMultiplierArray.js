const cleanMultiplierArray = (multiplierArray) => {
  if (!multiplierArray) return [];

  return (multiplierArray.match(/-?\d+/g) || []).map(Number);
};

export default cleanMultiplierArray;
