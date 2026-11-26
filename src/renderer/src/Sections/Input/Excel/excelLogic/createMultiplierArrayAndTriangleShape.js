export default function createMultiplierArrayAndTriangleShape(inputData1) {
  console.log('4. createMultiplierArrayAndTriangleShape called');

  const sortTriangleShape = [];
  const multiplierArray = [];

  const START_ROW = 4;
  const END_ROW = 24;

  if (!Array.isArray(inputData1) || inputData1.length < END_ROW) {
    throw new Error('Invalid input data: missing required rows.');
  }

  for (let i = START_ROW; i < END_ROW; i += 1) {
    const row = inputData1[i];

    if (!Array.isArray(row)) {
      throw new Error(`Invalid data at row index ${i}.`);
    }

    const rawMultiplier = row[1];

    // Treat empty cells as zero.
    if (
      rawMultiplier == null ||
      (typeof rawMultiplier === 'string' && rawMultiplier.trim() === '')
    ) {
      multiplierArray.push(0);
      continue;
    }

    const multiplier = Number(rawMultiplier);

    if (!Number.isSafeInteger(multiplier) || multiplier < 0) {
      throw new Error(`Invalid multiplier at row index ${i}.`);
    }

    multiplierArray.push(multiplier);

    if (multiplier === 0) {
      continue;
    }

    const rawSortValue = row[0];
    const sortValue = Number(rawSortValue);

    if (
      rawSortValue == null ||
      (typeof rawSortValue === 'string' && rawSortValue.trim() === '') ||
      !Number.isSafeInteger(sortValue)
    ) {
      throw new Error(`Invalid sort value at row index ${i}.`);
    }

    for (let j = 0; j < multiplier; j += 1) {
      sortTriangleShape.push(sortValue);
    }
  }

  return {
    multiplierArray,
    sortTriangleShape,
  };
}
