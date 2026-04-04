export default function formatRMatrix(data, varNames = null) {
  const n = data.length;
  const names = varNames || data.map((_, i) => `V${i + 1}`);

  const values = data.map((row) => row.map((v) => Number(v).toFixed(2)).join(', ')).join(',\n  ');

  const namesStr = names.map((n) => `"${n}"`).join(', ');

  return (
    `cor_matrix <- matrix(c(\n  ${values}\n), nrow = ${n}, ncol = ${n})\n` +
    `rownames(cor_matrix) <- c(${namesStr})\n` +
    `colnames(cor_matrix) <- c(${namesStr})`
  );
  return [header, ...rows].join('\n');
}
