import evenRound from "../../../Utils/evenRound";
import CheckboxRenderer from "./CheckboxRenderer";
import factorGroupComparator from "./factorGroupComparator";
import sortByFactorGroup from "../loadingsLogic/sortByFactorGroup";
import loadingState from "../../GlobalState/loadingState";
import i18n from "i18next";
import getFactorState from "../../GlobalState/getFactorState";
import getCoreState from "../../GlobalState/getCoreState";
import getRotationState from "../../GlobalState/getRotationState";
import getLoadingState from "../../GlobalState/getLoadingState";

// todo - re-organize factor groupings and sorts to optimize number of required loops
const loadingsTableDataPrep = numFactors => {
  const NumTrans = i18n.t("Number");
  const participantTrans = i18n.t("Participant");
  const factorTrans = i18n.t("Factor");

  // factorMatrix should be factors as rows - in Lipset => 9 cols, 7 -8 rows
  const factorMatrix1 = getFactorState("factorMatrix");
  const respondentNames = getCoreState("respondentNames");

  // get matrix autoflag booleans
  const fSigCriterionResults = getRotationState("fSigCriterionResults");

  // calculate the factor groupings so they can be assigned in col defs
  const highlighting = getLoadingState("highlighting");
  const factorGroupings = sortByFactorGroup([...factorMatrix1], highlighting);

  // set up Table Headers
  const tempRotFacStateArray = [];
  const gridColDefsLoadingsTable = [
    {
      headerName: NumTrans,
      field: "resNum",
      pinned: true,
      editable: false,
      sortable: true,
      width: 70,
      cellStyle: {
        textAlign: "center"
      }
    },
    {
      headerName: participantTrans,
      field: "respondent",
      width: 170,
      pinned: true,
      sortable: true,
      editable: false,
      cellStyle: {
        textAlign: "center"
      }
    },
    {
      headerName: "FG",
      field: "factorGroup",
      pinned: true,
      width: 70,
      editable: false,
      sortable: true,
      comparator: factorGroupComparator,
      cellStyle: {
        textAlign: "center"
      }
    },

    {
      headerName: "highlighting",
      field: "highlighting",
      pinned: false,
      editable: false,
      cellStyle: {
        textAlign: "center"
      },
      hide: true
    },
    {
      headerName: "defaultSort",
      field: "defaultSort",
      pinned: false,
      editable: false,
      cellStyle: {
        textAlign: "center"
      },
      hide: true
    }
  ];

  for (let i = 0; i < numFactors; i += 1) {
    const facNumber = i + 1;
    gridColDefsLoadingsTable.push(
      {
        headerName: `${factorTrans} ${facNumber}`,
        field: `factor${facNumber}`,
        pinned: false,
        width: 90,
        editable: false,
        sortable: true,
        cellStyle: {
          textAlign: "right"
        }
      },
      {
        headerName: `F${facNumber}`,
        field: `check${facNumber}`,
        pinned: false,
        editable: true,
        sortable: true,
        width: 35,
        cellRendererFramework: CheckboxRenderer,
        cellStyle: {
          textAlign: "left"
        }
      }
    ); // end push
  } // end loop

  // set up row data
  const gridRowDataLoadingsTable = [];
  for (let j = 0; j < respondentNames.length; j += 1) {
    const responNum = j + 1;
    const tempArray = {};
    const tempArray2 = [];
    tempArray.resNum = responNum;
    tempArray.respondent = respondentNames[j];
    tempArray.factorGroup = factorGroupings[j][1];
    tempArray.highlightingClass = factorGroupings[j][3];
    tempArray.defaultSort = factorGroupings[j][2];

    for (let k = 0; k < factorMatrix1.length; k += 1) {
      const facNum = k + 1;
      const tempVal = evenRound(factorMatrix1[k][j], 4);
      tempArray[`factor${facNum}`] = tempVal;
      // to set up tempRotStateArray
      tempArray2.push(tempVal);
      if (fSigCriterionResults.length > 0) {
        tempArray[`check${facNum}`] = fSigCriterionResults[j][k];
      } else {
        tempArray[`check${facNum}`] = false;
      }
    }
    tempRotFacStateArray.push(tempArray2);
    gridRowDataLoadingsTable.push(tempArray);
  }

  // to default order chart by highest factor loading
  gridRowDataLoadingsTable.sort((a, b) => a.defaultSort - b.defaultSort);

  loadingState.gridColDefsLoadingsTable = gridColDefsLoadingsTable;
  loadingState.gridRowDataLoadingsTable = gridRowDataLoadingsTable;
  loadingState.isLoadingFactorsKept = false;
  loadingState.isLoadingAutoflag = false;
  loadingState.isLoadingsTableInitialRender = true;
};

export default loadingsTableDataPrep;

/*

[[-0.2913921,-0.38405309,0.36818255,0.33476604,-0.54873003,0.47844413,0.58270093,-0.5156279,0.00535119],
[0.54946489,0.25842464,0.53279182,0.48828577,-0.55050616,-0.25841561,-0.27694738,0.2516003,0.10235977],
[0.27235702,0.53340833,-0.06233098,0.23347536,0.09999703,0.49517695,0.31834782,0.15611557,-0.20504991],
[0.38127303,0.25798596,-0.04259364,-0.23108778,0.3732567,-0.20646162,-0.12459488,-0.18559107,0.23330742],
[0.136368,0.00985499,0.12479254,0.14788418,0.08510235,0.40052389,0.12244333,-0.26464363,0.27489369],
[0.11270206,0.0465501,-0.04461116,0.05895006,0.10705338,0.13848592,0.0103522,0.22546198,-0.28485646],
[0.11134683,0.21171527,0.04065608,0.20433973,-0.23177919,-0.26077339,-0.04834682,0.18558271,0.13839383]]

"gridRowData": [
    {
      "respondent": "US1",
      "US1": 100,
      "US2": 54,
      "US3": 21,
      "US4": 23,
      "JP5": 10,
      "CA6": -23,
      "UK7": -32,
      "US8": 24,
      "FR9": 5
    },
    {
      "respondent": "US2",
      "US1": 54,
      "US2": 100,
      "US3": -8,
      "US4": 9,
      "JP5": 18,
      "CA6": -3,
      "UK7": -16,
      "US8": 38,
      "FR9": 7
    },
    {
      "respondent": "US3",
      "US1": 21,
      "US2": -8,
      "US3": 100,
      "US4": 40,
      "JP5": -54,
      "CA6": 9,
      "UK7": 5,
      "US8": -9,
      "FR9": 11
    },
    {
      "respondent": "US4",
      "US1": 23,
      "US2": 9,
      "US3": 40,
      "US4": 100,
      "JP5": -56,
      "CA6": 28,
      "UK7": 17,
      "US8": 6,
      "FR9": 3
    },
    {
      "respondent": "JP5",
      "US1": 10,
      "US2": 18,
      "US3": -54,
      "US4": -56,
      "JP5": 100,
      "CA6": -6,
      "UK7": -13,
      "US8": 2,
      "FR9": -3
    },
    {
      "respondent": "CA6",
      "US1": -23,
      "US2": -3,
      "US3": 9,
      "US4": 28,
      "JP5": -6,
      "CA6": 100,
      "UK7": 62,
      "US8": -37,
      "FR9": -21
    },
    {
      "respondent": "UK7",
      "US1": -32,
      "US2": -16,
      "US3": 5,
      "US4": 17,
      "JP5": -13,
      "CA6": 62,
      "UK7": 100,
      "US8": -29,
      "FR9": -3
    },
    {
      "respondent": "US8",
      "US1": 24,
      "US2": 38,
      "US3": -9,
      "US4": 6,
      "JP5": 2,
      "CA6": -37,
      "UK7": -29,
      "US8": 100,
      "FR9": -21
    },
    {
      "respondent": "FR9",
      "US1": 5,
      "US2": 7,
      "US3": 11,
      "US4": 3,
      "JP5": -3,
      "CA6": -21,
      "UK7": -3,
      "US8": -21,
      "FR9": 100
    }
  ],
  */
