const convertJSONToData = function(JsonObj) {
    let csvBody = [];
    let sortHeaders = [];
    let namesAndSortsArray = [];

    let keys = Object.keys(JsonObj);
    let headerArray = Object.keys(JsonObj[keys[0]]);
    let sort0 = JsonObj[keys[0]].sort;
    let sortArray = sort0.split("|");

    for (let k = 0, kLen = sortArray.length; k < kLen; k++) {
        let counter1 = "S" + (k + 1);
        sortHeaders.push(counter1);
    }
    let headerArray2 = headerArray.concat(sortHeaders);
    // do not change to ID - will throw error when opening in MS Excel!
    headerArray2.unshift("Id");
    csvBody.push(headerArray2);

    for (let i = 0, iLen = keys.length; i < iLen; i++) {
        let tempArray1 = [];
        let namesAndSortsTempArray = [];
        // let tempArray2 = [];

        // get index
        let temp4 = keys[i];
        //console.log(JSON.stringify(temp4));

        // get object
        let arrayObj = JsonObj[temp4];
        // console.log(JSON.stringify(arrayObj));

        // get object keys
        let arrayObjKeys = Object.keys(arrayObj);
        //console.log(JSON.stringify(arrayObjKeys));

        // create unique id from key
        let id = temp4.slice(-10);
        tempArray1.push(id);
        namesAndSortsTempArray.push(temp4);

        for (let m = 0, mLen = arrayObjKeys.length; m < mLen; m++) {
            let value = arrayObj[arrayObjKeys[m]];
            tempArray1.push(value);
        }

        // get sort of object
        let sort1 = arrayObj.sort;
        let sort2 = sort1.split("|");

        for (let j = 0, jLen = sort2.length; j < jLen; j++) {
            let temp5 = +sort2[j];
            tempArray1.push(temp5);
            namesAndSortsTempArray.push(temp5);
        }
        csvBody.push(tempArray1);
        namesAndSortsArray.push(namesAndSortsTempArray);
    }

    return [csvBody, namesAndSortsArray];
};

export default convertJSONToData;
