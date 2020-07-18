import calcState from "../../GlobalState/calcState";
import i18n from "i18next";
const clone = require("rfdc")();

const pushFreeDistributionDataToOutput = function(
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  sheetNamesXlsx.push(i18n.t("Free Dist"));

  const columns = [
    {
      wch: 10
    },
    {
      wch: 20
    },
    {
      wch: 10
    },
    {
      wch: 10
    }
  ];
  colSizes.push(columns);

  const freeDistributionArray = clone(calcState.freeDistributionArray);

  freeDistributionArray.unshift(
    ["", ""],
    [i18n.t("Free Distribution Data Results")],
    ["", ""]
  );

  outputData.push(freeDistributionArray);

  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushFreeDistributionDataToOutput;
