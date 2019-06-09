import state from "../../../../store";
import evenRound from "../../../../Utils/evenRound";

const rotationTablePrep = (d3RotChartData, baselineData) => {
  const abFactors = state.getState("abFactors");
  const minFac = Math.min(...abFactors);
  const maxFac = Math.max(...abFactors);
  const factorA = `Fac. ${minFac}`;
  const factorB = `Fac. ${maxFac}`;
  const factorAchng = `Chg. ${minFac}`;
  const factorBchng = `Chg. ${maxFac}`;

  const colMaxWidth = state.getState("colMaxWidth");

  const rotColDefsFactorTable = [
    {
      headerName: "N.",
      field: "resNum",
      pinned: true,
      editable: false,
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
      width: colMaxWidth,
      cellStyle: {
        textAlign: "center"
      }
    },
    {
      headerName: factorA,
      field: "factor1",
      pinned: false,
      editable: false,
      width: 80,
      cellStyle(params) {
        const sig = params.node.data.factor1Sig;
        if (sig) {
          return {
            textAlign: "center",
            background: "#b4dffe" // "aquamarine"
          };
        }
        return {
          textAlign: "center"
        };
      }
    },
    {
      headerName: factorAchng,
      field: "change1",
      pinned: false,
      editable: false,
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
      width: 80,
      cellStyle(params) {
        const sig = params.node.data.factor2Sig;
        if (sig) {
          return {
            textAlign: "center",
            background: "#ffe4b2"
          };
        }
        return {
          textAlign: "center"
        };
      }
    },
    {
      headerName: factorBchng,
      field: "change2",
      pinned: false,
      editable: false,
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
      suppressSorting: true,
      hide: true,
      width: 0
    },
    {
      headerName: "factor2Sig",
      field: "change2",
      pinned: false,
      editable: false,
      suppressSorting: true,
      hide: true,
      width: 0
    }
  ];

  const rotRowDataFactorTable = [];

  for (let j = 0; j < d3RotChartData.length; j += 1) {
    const tempObj = {};
    const baselineA = baselineData[j][minFac - 1];
    const baselineB = baselineData[j][maxFac - 1];
    const newValueA = d3RotChartData[j].factor1;
    const newValueB = d3RotChartData[j].factor2;
    const factor1Sig = d3RotChartData[j].factor1Sig;
    const factor2Sig = d3RotChartData[j].factor2Sig;
    const diffA = evenRound(newValueA - baselineA, 4);
    const diffB = evenRound(newValueB - baselineB, 4);
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

  state.setState({
    rotColDefsFactorTable,
    rotRowDataFactorTable
  });
};

export default rotationTablePrep;
