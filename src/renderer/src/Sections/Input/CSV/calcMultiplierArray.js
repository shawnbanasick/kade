function calcMultiplierArray(arr) {
  // Initialize array with 20 zeros (for values -6 to 13)
  const counts = new Array(20).fill(0);
  // Count occurrences
  for (const value of arr) {
    if (value >= -6 && value <= 13) {
      // Convert value to array index
      const index = value + 6;
      counts[index]++;
    }
  }
  return counts;
}

export default calcMultiplierArray;
