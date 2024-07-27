import pushProjectOverviewToOutputArray from './2_pushProjectOverviewToOutputArray';
import i18n from 'i18next';
import coreState from '../../GlobalState/coreState';
import loadingState from '../../GlobalState/loadingState';
import appState from '../../GlobalState/appState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import outputState from '../../GlobalState/outputState';
import cloneDeep from 'lodash/cloneDeep';

const pushProjectOverviewToOutputArrayDispatcher = () => {
  // State
  const qSortPattern3 = coreState.getState().qSortPattern;
  const autoFlagHistory = loadingState.getState().autoFlagHistory;
  const version = appState.getState().version;
  const projectName = coreState.getState().projectName;

  const totalStatements1 = coreState.getState().numStatements;
  const totalStatements = totalStatements1.toString();

  const totalSorts1 = coreState.getState().numQsorts;
  const totalSorts = totalSorts1.toString();

  const list = cloneDeep(projectHistoryState.getState().projectHistoryArray);
  const distStateUpperValueText = outputState.getState().distStateUpperValueText;
  const distStateLowerValueText = outputState.getState().distStateLowerValueText;

  // no translation for "Project Overview" so that Excel Type 3 works when tab searching for parse data
  const sheetidTrans = 'Project Overview';
  // get Translations
  const projectNameTrans = `${i18n.t('Project Name')}:  `;
  const numStatementsTrans = `${i18n.t('Total Number of Statements')}:  `;
  const qSortDesignTrans = `${i18n.t('Q sort Design')}:  `;
  const totalNumSortsTrans = `${i18n.t('Total Number of Q sorts')}:  `;
  const analsysProcessTrans = `${i18n.t('Project Log')}:  `;
  const distThreshold1Trans = `${i18n.t('Distinguishing statements threshold 1')}:  `;
  const distThreshold2Trans = `${i18n.t('Distinguishing statements threshold 2')}:  `;
  const analysisCompleteTrans = `${i18n.t('Analysis completed on')}:  `;
  const kadeVersionTrans = `${i18n.t('KADE Version Number')}:  `;

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
    kadeVersionTrans,
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
