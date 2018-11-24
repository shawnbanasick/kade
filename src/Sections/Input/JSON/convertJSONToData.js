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
  // do not change to ID - will throw error when opening in MS Excel!
  headerArray2.unshift("Id");
  csvBody.push(headerArray2);

  for (let i = 0, iLen = keys.length; i < iLen; i += 1) {
    const tempArray1 = [];
    const namesAndSortsTempArray = [];
    // let tempArray2 = [];

    // get index
    const temp4 = keys[i];
    // console.log(JSON.stringify(temp4));

    // get object
    const arrayObj = JsonObj[temp4];
    // console.log(JSON.stringify(arrayObj));

    // get object keys
    const arrayObjKeys = Object.keys(arrayObj);
    // console.log(JSON.stringify(arrayObjKeys));

    // create unique id from key
    const id = temp4.slice(-10);
    tempArray1.push(id);
    namesAndSortsTempArray.push(temp4);

    for (let m = 0, mLen = arrayObjKeys.length; m < mLen; m += 1) {
      const value = arrayObj[arrayObjKeys[m]];
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
