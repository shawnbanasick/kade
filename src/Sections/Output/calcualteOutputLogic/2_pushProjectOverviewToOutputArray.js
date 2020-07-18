import currentDate1 from "../../../Utils/currentDate1";
import currentTime1 from "../../../Utils/currentTime1";

const pushProjectHistoryToOutputArray = function(
  qSortPattern3,
  autoFlagHistory,
  version,
  projectName,
  totalStatements,
  totalSorts,
  list,
  distStateUpperValueText,
  distStateLowerValueText,
  overViewTranslations
) {
  const sheetidTrans = overViewTranslations.sheetidTrans;
  const projectNameTrans = overViewTranslations.projectNameTrans;
  const numStatementsTrans = overViewTranslations.numStatementsTrans;
  const qSortDesignTrans = overViewTranslations.qSortDesignTrans;
  const totalNumSortsTrans = overViewTranslations.totalNumSortsTrans;
  const analsysProcessTrans = overViewTranslations.analsysProcessTrans;
  const distThreshold1Trans = overViewTranslations.distThreshold1Trans;
  const distThreshold2Trans = overViewTranslations.distThreshold2Trans;
  const analysisCompleteTrans = overViewTranslations.analysisCompleteTrans;
  const kadeVersionTrans = overViewTranslations.kadeVersionTrans;

  const sheetNamesXlsx = [sheetidTrans];
  const dataXlsx = [];

  const spacer = ["", ""];

  const projectNameArray = [projectNameTrans, projectName];
  dataXlsx.push(spacer, projectNameArray, spacer);

  const totalNumberStatementArray = [numStatementsTrans, totalStatements];
  dataXlsx.push(totalNumberStatementArray, spacer);

  const qSortPattern2 = qSortPattern3.join();
  const qSortPattern = [qSortDesignTrans, qSortPattern2];
  dataXlsx.push(qSortPattern, spacer);

  const totalSortsArray = [totalNumSortsTrans, totalSorts];
  dataXlsx.push(totalSortsArray, spacer);

  // get project history

  for (let i = 0; i < list.length; i++) {
    if (i === 0) {
      dataXlsx.push([analsysProcessTrans, `${i + 1}. ${list[i].logMessage}`]);
    } else {
      dataXlsx.push(["", `${i + 1}. ${list[i].logMessage}`]);
    }
  }
  dataXlsx.push(spacer, autoFlagHistory);
  dataXlsx.push(spacer, [distThreshold1Trans, distStateUpperValueText]);
  dataXlsx.push(spacer, [distThreshold2Trans, distStateLowerValueText]);

  const timeCompleted = `${currentDate1()} at ${currentTime1()}`;
  dataXlsx.push(spacer, [analysisCompleteTrans, timeCompleted]);
  dataXlsx.push(spacer, [kadeVersionTrans, version]);

  const colSizes = [
    [
      {
        wch: 40
      },
      {
        wch: 70
      }
    ]
  ];

  const outputData = [];
  outputData.push(dataXlsx);

  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushProjectHistoryToOutputArray;
