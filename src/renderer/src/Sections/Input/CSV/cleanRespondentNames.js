const cleanRespondentNames = names => {
  let newNames = names.map((item, index) => {
    let entry = item.replace(/\./g, "\\.");
    return entry;
  });
  return newNames;
};

export default cleanRespondentNames;
