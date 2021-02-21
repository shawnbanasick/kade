import pushProjectOverviewToOutputArray from "./2_pushProjectOverviewToOutputArray";
import outputState from "../../GlobalState/outputState";
import appState from "../../GlobalState/appState";
import coreState from "../../GlobalState/coreState";
import projectHistoryState from "../../GlobalState/projectHistoryState";
import loadingState from "../../GlobalState/loadingState";
import i18n from "i18next";
const clone = require("rfdc")();

const pushProjectOverviewToOutputArrayDispatcher = () => {
  // getState
  const qSortPattern3 = clone(coreState.qSortPattern);
  const autoFlagHistory = clone(loadingState.autoFlagHistory);
  const version = appState.version;
  const projectName = coreState.projectName;
  const totalStatements = coreState.numStatements.toString();
  const totalSorts = coreState.numQsorts.toString();
  const list = clone(projectHistoryState.projectHistoryArray);
  const distStateUpperValueText = outputState.distStateUpperValueText;
  const distStateLowerValueText = outputState.distStateLowerValueText;

  // no translation for "Project Overview" so that Excel Type 3 works when tab searching for parse data
  const sheetidTrans = "Project Overview";
  // get Translations
  const projectNameTrans = `${i18n.t("Project Name")}:  `;
  const numStatementsTrans = `${i18n.t("Total Number of Statements")}:  `;
  const qSortDesignTrans = `${i18n.t("Q sort Design")}:  `;
  const totalNumSortsTrans = `${i18n.t("Total Number of Q sorts")}:  `;
  const analsysProcessTrans = `${i18n.t("Project Log")}:  `;
  const distThreshold1Trans = `${i18n.t(
    "Distinguishing statements threshold 1"
  )}:  `;
  const distThreshold2Trans = `${i18n.t(
    "Distinguishing statements threshold 2"
  )}:  `;
  const analysisCompleteTrans = `${i18n.t("Analysis completed on")}:  `;
  const kadeVersionTrans = `${i18n.t("KADE Version Number")}:  `;

  const overViewTranslations = {
    sheetidTrans,
    projectNameTrans,
    numStatementsTrans,
    qSortDesignTrans,
    totalNumSortsTrans,
    analsysProcessTrans,
    distThreshold1Trans,
    distThreshold2Trans,
    analysisCompleteTrans,
    kadeVersionTrans
  };

  const projectOverview = pushProjectOverviewToOutputArray(
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
  );
  return projectOverview;
};

export default pushProjectOverviewToOutputArrayDispatcher;
