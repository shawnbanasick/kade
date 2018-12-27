function convertJSONToData(JsonObj) {
  const csvBody = [];
  const sortHeaders = [];
  const namesAndSortsArray = [];
  const keys = Object.keys(JsonObj);
  const headerArray = Object.keys(JsonObj[keys[0]]);
  const sort0 = JsonObj[keys[0]].sort;
  const sortArray = sort0.split("|");

  for (let k = 0, kLen = sortArray.length; k < kLen; k += 1) {
    const counter1 = `S ${k + 1}`;
    sortHeaders.push(counter1);
  }

  const headerArray2 = headerArray.concat(sortHeaders);
  // do not change to "ID" - will throw error when opening in MS Excel!
  headerArray2.unshift("Id");
  csvBody.push(headerArray2);

  for (let i = 0, iLen = keys.length; i < iLen; i += 1) {
    const tempArray1 = [];
    const namesAndSortsTempArray = [];

    // get index
    const temp4 = keys[i];

    // get row object
    const arrayObj = JsonObj[temp4];

    // get row object keys
    const arrayObjKeys = Object.keys(arrayObj);

    // create unique id from key
    const id = temp4.slice(-10);
    tempArray1.push(id);
    namesAndSortsTempArray.push(temp4);

    // loop through all entries
    for (let m = 0, mLen = arrayObjKeys.length; m < mLen; m += 1) {
      let value = arrayObj[arrayObjKeys[m]];
      // remove any line break or extra comma in string
      value = value.replace(/(\r\n\t|\n|\r\t|,)/gm, "");
      tempArray1.push(value);
    }

    // get sort of object
    const sort1 = arrayObj.sort;
    const sort2 = sort1.split("|");

    for (let j = 0, jLen = sort2.length; j < jLen; j += 1) {
      const temp5 = +sort2[j];
      tempArray1.push(temp5);
      namesAndSortsTempArray.push(temp5);
    }
    csvBody.push(tempArray1);
    namesAndSortsArray.push(namesAndSortsTempArray);
  }
  return [csvBody, namesAndSortsArray];
}

export default convertJSONToData;
