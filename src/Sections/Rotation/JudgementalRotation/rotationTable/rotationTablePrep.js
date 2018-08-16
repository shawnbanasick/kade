import store from "../../../store";
import evenRound from "../../../Utils/evenRound";

const rotationTablePrep = function(d3RotChartData, baselineData) {
  let abFactors = store.getState("abFactors");
  let minFac = Math.min(...abFactors);
  let maxFac = Math.max(...abFactors);
  let factorA = "Fac. " + minFac;
  let factorB = "Fac. " + maxFac;
  let factorAchng = "Chg. " + minFac;
  let factorBchng = "Chg. " + maxFac;

  let rotColDefsFactorTable = [
    {
      headerName: "Num.",
      field: "resNum",
      pinned: true,
      editable: false,
      sortable: true,
      width: 50,
      cellStyle: {
        textAlign: "center"
      }
    },
    {
      headerName: "Part.",
      field: "respondent",
      pinned: true,
      editable: false,
      sortable: true,
      width: 130,
      cellStyle: {
        textAlign: "center"
      }
    },
    {
      headerName: factorA,
      field: "factor1",
      pinned: false,
      editable: false,
      sortable: true,
      width: 80,
      cellStyle: function(params) {
        let sig = params.node.data.factor1Sig;
        if (sig) {
          return {
            textAlign: "center",
            background: "aquamarine"
          };
        } else {
          return {
            textAlign: "center"
          };
        }
      }
    },
    {
      headerName: factorAchng,
      field: "change1",
      pinned: false,
      editable: false,
      sortable: true,
      width: 80,
      cellStyle: {
        textAlign: "center"
      }
    },
    {
      headerName: factorB,
      field: "factor2",
      pinned: false,
      editable: false,
      sortable: true,
      width: 80,
      cellStyle: function(params) {
        let sig = params.node.data.factor2Sig;
        if (sig) {
          return {
            textAlign: "center",
            background: "#ffe4b2"
          };
        } else {
          return {
            textAlign: "center"
          };
        }
      }
    },
    {
      headerName: factorBchng,
      field: "change2",
      pinned: false,
      editable: false,
      sortable: true,
      width: 80,
      cellStyle: {
        textAlign: "center"
      }
    },
    {
      headerName: "factor1Sig",
      field: "factor1Sig",
      pinned: false,
      editable: false,
      sortable: false,
      hide: true,
      width: 0
    },
    {
      headerName: "factor2Sig",
      field: "change2",
      pinned: false,
      editable: false,
      sortable: false,
      hide: true,
      width: 0
    }
  ];

  let rotRowDataFactorTable = [];

  for (let j = 0; j < d3RotChartData.length; j++) {
    let tempObj = {};
    let baselineA = baselineData[j][minFac - 1];
    let baselineB = baselineData[j][maxFac - 1];
    let newValueA = d3RotChartData[j].factor1;
    let newValueB = d3RotChartData[j].factor2;
    let factor1Sig = d3RotChartData[j].factor1Sig;
    let factor2Sig = d3RotChartData[j].factor2Sig;
    let diffA = evenRound(newValueA - baselineA, 4);
    let diffB = evenRound(newValueB - baselineB, 4);
    tempObj.resNum = d3RotChartData[j].num;
    tempObj.respondent = d3RotChartData[j].respondent;
    tempObj.factor1 = newValueA;
    tempObj.change1 = diffA;
    tempObj.factor1Sig = factor1Sig;
    tempObj.factor2 = newValueB;
    tempObj.change2 = diffB;
    tempObj.factor2Sig = factor2Sig;
    rotRowDataFactorTable.push(tempObj);
  }

  store.setState({
    rotColDefsFactorTable: rotColDefsFactorTable,
    rotRowDataFactorTable: rotRowDataFactorTable
  });
};

export default rotationTablePrep;

