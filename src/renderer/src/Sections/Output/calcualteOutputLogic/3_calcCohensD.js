/**
 * Calculates Cohen's d effect size between factor scores and identifies
 * distinguishing statements.
 *
 * @param {number[][]} zscores - 2D array [statements x factors] of standardized factor scores
 * @param {number} nFactors - number of factors
 * @param {number} dThreshold - Cohen's d threshold (must be between 0 and 1)
 * @returns {object} - diff matrix and distinguishing statement counts per factor
 */
function cohenEffectSize(zscores, nFactors, dThreshold) {
  if (dThreshold <= 0 || dThreshold > 1) {
    throw new Error('Effect size (dThreshold) must be in the range (0, 1].');
  }

  const nStatements = zscores.length;

  const diff = Array.from({ length: nFactors }, () =>
    Array.from({ length: nFactors }, () => new Array(nStatements).fill(0))
  );

  for (let i = 0; i < nFactors; i++) {
    for (let j = 0; j < nFactors; j++) {
      if (i === j) continue;
      for (let s = 0; s < nStatements; s++) {
        if (Math.abs(zscores[s][i] - zscores[s][j]) >= dThreshold) {
          diff[i][j][s] = 1;
        }
      }
    }
  }

  const ds = Array.from({ length: nFactors }, () => new Array(nStatements).fill(0));
  for (let i = 0; i < nFactors; i++) {
    for (let s = 0; s < nStatements; s++) {
      let total = 0;
      for (let j = 0; j < nFactors; j++) {
        if (i !== j) total += diff[i][j][s];
      }
      ds[i][s] = total;
    }
  }

  // 1-based: add 1 to each index
  const distinguishing = Array.from({ length: nFactors }, (_, i) =>
    zscores
      .map((_, s) => s)
      .filter((s) => ds[i][s] === nFactors - 1)
      .map((s) => s + 1)
  );

  const dsTotals = zscores.map((_, s) => ds.reduce((sum, row) => sum + row[s], 0));

  // 1-based: add 1 to each index
  const consensus = zscores
    .map((_, s) => s)
    .filter((s) => dsTotals[s] === 0)
    .map((s) => s + 1);

  return { diff, ds, distinguishing, consensus };
}
export default cohenEffectSize;
