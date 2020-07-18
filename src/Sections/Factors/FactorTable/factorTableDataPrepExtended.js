import evenRound from "../../../Utils/evenRound";
import factorState from "../../GlobalState/factorState";
import i18n from "i18next";


const factorTableEigenDataPrep = (numFactors, eigenValues, lArray, largestCorrelationArray, largestFactorLoadingArray) => {
  const eigenValuesTrans = i18n.t("Eigenvalues");
  const explainedVarianceTrans = i18n.t("Explained Variance");
  const cumuExplainedVarianceTrans = i18n.t("Cumulative Explained Variance");
  const factorTrans = i18n.t("Factor");
  const lCoefficientTrans = i18n.t("L Coefficient");
  const largestCorrelationTrans = i18n.t("Largest Correlation");
  const largestFactorLoadingTrans = i18n.t("Largest Factor Loading"); 
  
  const gridColDefsFacTableEigen = [
    {
      headerName: "",
      field: "EigenList",
      pinned: true,
      sortable: true,
      editable: false,
      width: 280,
      cellStyle: {
        textAlign: "center"
      }
    }
  ];

  for (let i = 0; i < numFactors; i += 1) {
    const facNumber = i + 1;
    gridColDefsFacTableEigen.push({
      headerName: `${factorTrans} ${facNumber}`,
      field: `factor${facNumber}`,
      pinned: false,
      sortable: true,
      editable: false,
      width: 90,
      cellStyle: {
        textAlign: "center"
      }
    }); // end push
  } // end loop

  // add labels
  eigenValues[0].unshift(eigenValuesTrans);
  eigenValues[1].unshift(explainedVarianceTrans);
  eigenValues[2].unshift(cumuExplainedVarianceTrans);


  eigenValues.push(
        [largestCorrelationTrans, ...largestCorrelationArray], 
        [largestFactorLoadingTrans, ...largestFactorLoadingArray],
        [lCoefficientTrans, ...lArray]        
        );

  const gridRowDataFacTableEigen = [];

  // format data rows
  for (let j = 0; j < eigenValues.length; j += 1) {
    // let responNum = j + 1;
    const tempArray = {};
    tempArray.EigenList = eigenValues[j][0];

    for (let k = 1; k < eigenValues[0].length; k += 1) {
      if (j === 0) {
        tempArray[`factor${k}`] = evenRound(eigenValues[j][k], 4);
      } else {
        tempArray[`factor${k}`] = eigenValues[j][k];
      }
    }

    gridRowDataFacTableEigen.push(tempArray);
  }

  factorState.gridColDefsFacTableEigen = gridColDefsFacTableEigen;
  factorState.gridRowDataFacTableEigen = gridRowDataFacTableEigen;
};

export default factorTableEigenDataPrep;
