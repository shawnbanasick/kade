import store from "../../store";
import indexOf from 'lodash/indexOf';
import cloneDeep from "lodash/cloneDeep";
import evenRound from "../../Utils/evenRound";
import transposeMatrix from "../../Utils/transposeMatrix";

// todo - try to eliminate lodash dependency

const sortByFactorGroup = function(data, highlighting) {
    let sortingArray = [];
    let factorSortedData = [];
    let tempObj;
    let numFactorsKeptForRot = store.getState("numFactorsKeptForRot");

    // cut the data => get appropriate factor groups
    data.length = numFactorsKeptForRot;

    // data comes in as factors as rows shift to factors as columns
    let newData = transposeMatrix(data);

    // loop through each table row (participant q-sort) to develop sorting array
    for (let i = 0, iLen = newData.length; i < iLen; i++) {
        tempObj = {};

        // grab factor as row
        let pullNumbers = newData[i];

        // set max and min values of table row (q-sort) for factor comparison sorting
        tempObj.maxValue = Math.max(...pullNumbers); // q-sort max
        tempObj.minValue = Math.min(...pullNumbers); // q-sort min
        tempObj.sortNum = i + 1; // participant number
        tempObj.compareValue = evenRound(
            Math.abs(tempObj.maxValue) - Math.abs(tempObj.minValue),
            8
        );
        // if max - min is positive (max loads more than min)
        if (tempObj.compareValue >= 0) {
            // get location (factor id) of max value
            tempObj.indexValue = indexOf(newData[i], tempObj.maxValue);
            tempObj.subSortValue = tempObj.maxValue;
        } else {
            // if max - min is negative (min loads more than max)
            // get location (factor id) of min value
            tempObj.indexValue = indexOf(newData[i], tempObj.minValue);
            tempObj.subSortValue = Math.abs(tempObj.minValue);
        }
        // sort property is the array
        tempObj.sort = newData[i];
        sortingArray.push(tempObj);
    }

    // todo check to see if this can be removed
    let factorSortedArray = cloneDeep(sortingArray);

    // sort object by two properties
    factorSortedArray.sort(function(a, b) {
        // sort by highest loading factor
        let value = a.indexValue - b.indexValue;
        // sort by loading within highest loading factor
        return value ? value : b.subSortValue - a.subSortValue;
    });

    let factorGroupNumber,
        lookUpIndexValue,
        cssClassName;
    let subGroupCounter = 0;

    // to set the factor group and sub-group numbers
    for (let j = 0, jLen = factorSortedArray.length; j < jLen; j++) {
        lookUpIndexValue = factorSortedArray[j].indexValue;
        // if first time through, or if look up value equals the index value of
        if (j === 0 || lookUpIndexValue === factorSortedArray[j - 1].indexValue) {
            subGroupCounter = subGroupCounter + 1;
        } else {
            subGroupCounter = 1;
        }
        cssClassName = "F" + (lookUpIndexValue + 1) + highlighting;
        factorGroupNumber = "F" + (lookUpIndexValue + 1) + "-" + subGroupCounter;
        // factorGroupNumber = +(lookUpIndexValue + 1 + "." + subGroupCounter);
        factorSortedData.push([
            factorSortedArray[j].sortNum,
            factorGroupNumber,
            j + 1,
            cssClassName
        ]);
    }

    // to order by participant number
    factorSortedData.sort(function(a, b) {
        return a[0] - b[0];
    });

    return factorSortedData;
};

export default sortByFactorGroup;
