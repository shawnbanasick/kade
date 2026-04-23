import evenRound from '../../../Utils/evenRound';

const factorTableEigenDataPrep = (
  numFactors,
  eigenValues,
  eigensTranslations,
  parallelMeans = [],
  parallel95 = []
) => {
  const parallelMeansArray = [];
  const parallel95Array = [];
  parallelMeans.forEach((array, index) => {
    parallelMeansArray.push(array[1]);
    parallel95Array.push(parallel95[index][1]);
  });

  parallelMeansArray.unshift(eigensTranslations.parallelMeansTrans);
  parallel95Array.unshift(eigensTranslations.parallel95Trans);

  const gridColDefsFacTableEigen = [
    {
      headerName: '',
      field: 'EigenList',
      pinned: true,
      sortable: true,
      editable: false,
      width: 280,
      cellStyle: {
        textAlign: 'center',
      },
    },
  ];

  // setup HEADER
  for (let i = 0; i < numFactors; i += 1) {
    const facNumber = i + 1;
    gridColDefsFacTableEigen.push({
      headerName: `${eigensTranslations.factorTrans2} ${facNumber}`,
      field: `factor${facNumber}`,
      pinned: false,
      sortable: true,
      editable: false,
      width: 90,
      cellStyle: {
        textAlign: 'center',
      },
    }); // end push
  } // end loop

  // add labels
  eigenValues[0].unshift(eigensTranslations.eigenValuesTrans);
  eigenValues[1].unshift(eigensTranslations.explainedVarianceTrans);
  eigenValues[2].unshift(eigensTranslations.cumuExplainedVarianceTrans);

  let originalArray = eigenValues.shift();
  if (parallelMeansArray.length > 1) {
    eigenValues.unshift(parallelMeansArray, parallel95Array);
  }
  eigenValues.unshift(originalArray);

  const gridRowDataFacTableEigen = [];

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

  const results = { gridColDefsFacTableEigen, gridRowDataFacTableEigen };

  return results;
};

export default factorTableEigenDataPrep;
