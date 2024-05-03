import factorTableEigenDataPrep from '../../../Factors/FactorTableEigen/FactorTableEigenDataPrep';


const parameter1 = 7;
const parameter2 = [[2.124,1.5742,1.5548,1.0322,0.3691,0.6264,0.2407],[24,17,17,11,4,7,3],[24,41,58,69,73,80,83]];
const parameter3 = {"eigenValuesTrans":"Eigenvalues","explainedVarianceTrans":"explained variance","cumuExplainedVarianceTrans":"cumulative explained variance","factorTrans2":"Factor"};

const testValue1 = {"gridColDefsFacTableEigen":[{"headerName":"","field":"EigenList","pinned":true,"sortable":true,"editable":false,"width":280,"cellStyle":{"textAlign":"center"}},{"headerName":"Factor 1","field":"factor1","pinned":false,"sortable":true,"editable":false,"width":90,"cellStyle":{"textAlign":"center"}},{"headerName":"Factor 2","field":"factor2","pinned":false,"sortable":true,"editable":false,"width":90,"cellStyle":{"textAlign":"center"}},{"headerName":"Factor 3","field":"factor3","pinned":false,"sortable":true,"editable":false,"width":90,"cellStyle":{"textAlign":"center"}},{"headerName":"Factor 4","field":"factor4","pinned":false,"sortable":true,"editable":false,"width":90,"cellStyle":{"textAlign":"center"}},{"headerName":"Factor 5","field":"factor5","pinned":false,"sortable":true,"editable":false,"width":90,"cellStyle":{"textAlign":"center"}},{"headerName":"Factor 6","field":"factor6","pinned":false,"sortable":true,"editable":false,"width":90,"cellStyle":{"textAlign":"center"}},{"headerName":"Factor 7","field":"factor7","pinned":false,"sortable":true,"editable":false,"width":90,"cellStyle":{"textAlign":"center"}}],"gridRowDataFacTableEigen":[{"EigenList":"Eigenvalues","factor1":2.124,"factor2":1.5742,"factor3":1.5548,"factor4":1.0322,"factor5":0.3691,"factor6":0.6264,"factor7":0.2407},{"EigenList":"explained variance","factor1":24,"factor2":17,"factor3":17,"factor4":11,"factor5":4,"factor6":7,"factor7":3},{"EigenList":"cumulative explained variance","factor1":24,"factor2":41,"factor3":58,"factor4":69,"factor5":73,"factor6":80,"factor7":83}]};


test("factor Table Eigen Data Prep", () => {
    const value1 = factorTableEigenDataPrep(parameter1, parameter2, parameter3);
    expect(value1).toEqual(testValue1);
  });

