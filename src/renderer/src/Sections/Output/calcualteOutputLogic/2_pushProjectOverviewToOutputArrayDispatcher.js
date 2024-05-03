import pushProjectOverviewToOutputArray from "./2_pushProjectOverviewToOutputArray";
import i18n from "i18next";
import getCoreState from "../../GlobalState/getCoreState";
import getLoadingState from "../../GlobalState/getLoadingState";
import getAppState from "../../GlobalState/getAppState";
import getProjectHistoryState from "../../GlobalState/getProjectHistoryState";
import getOutputState from "../../GlobalState/getOutputState";

const pushProjectOverviewToOutputArrayDispatcher = () => {
  // State
  const qSortPattern3 = getCoreState("qSortPattern");
  const autoFlagHistory = getLoadingState("autoFlagHistory");
  const version = getAppState("version");
  const projectName = getCoreState("projectName");

  const totalStatements1 = getCoreState("numStatements");
  const totalStatements = totalStatements1.toString();

  const totalSorts1 = getCoreState("numQsorts");
  const totalSorts = totalSorts1.toString();

  const list = getProjectHistoryState("projectHistoryArray");
  const distStateUpperValueText = getOutputState("distStateUpperValueText");
  const distStateLowerValueText = getOutputState("distStateLowerValueText");

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
