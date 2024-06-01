export default function sortsDisplayText(mainDataObject) {
  const sortsDisplayText2 = mainDataObject.map((item) => `${item.name} : ${item.displaySort}`);

  return sortsDisplayText2;
}
