const filterLines = lines => {
  let newLines = lines.map((item, index) => {
    item = item.filter(entry => entry !== "");
    return item;
  });

  newLines = newLines.filter(line => line.length !== 0);
  return newLines;
};

export default filterLines;
