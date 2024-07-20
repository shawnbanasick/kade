import transposeMatrix from '../../../Utils/transposeMatrix';
import loadingsTableDataPrep from '../LoadingsTable/loadingsTableDataPrep';
import calculateCommunalities from '../../Rotation/varimaxLogic/2calculateCommunalities';
import calculateSigCriterionValues from '../../Rotation/varimaxLogic/2calculateSigCriterionValues';
import i18n from 'i18next';
import loadingState from '../../GlobalState/loadingState';
import rotationState from '../../GlobalState/rotationState';
import outputState from '../../GlobalState/outputState';
import factorState from '../../GlobalState/factorState';

const autoFlagFactors = () => {
  loadingState.setState({ isLoadingAutoflag: true });
  // loadingState.setState({ autoflagButtonColor: '#dbdbe0' });
  loadingState.setState({ autoflagButtonColor: 'var(--main-theme-color)' });

  // should produce for Lipset calc style matrix - 9 cols by 7 rows

  // give button time to display loading spinner
  setTimeout(() => {
    // get data for current user selected significance level
    const userSelectedSigLevel = loadingState.getState().userSelectedSigLevel;
    const lookupTable = {
      3.891: 'P < 0.0001',
      3.481: 'P < 0.0005',
      3.291: 'P < 0.001',
      2.807: 'P < 0.005',
      2.575: 'P < 0.01',
      1.96: 'P < 0.05',
      1.645: 'P < 0.1',
      1.44: 'P < 0.15',
      1.28: 'P < 0.2',
      majority: 'Majority of Common Variance',
    };
    const criticalLevelText = lookupTable[userSelectedSigLevel];
    const requireMajorityCommonVariance = loadingState.getState().requireMajorityCommonVariance;
    // setup Project History Array text
    let comVarText = ` ${i18n.t('and a majority of common variance was not required')}`;
    if (requireMajorityCommonVariance === true) {
      comVarText = ` ${i18n.t('and a majority of common variance was required')}`;
    }
    const autoFlagHistory = [`${i18n.t('Auto-Flag')}: `, `${criticalLevelText}${comVarText}`];

    const numFactorsKeptForRot = rotationState.getState().numFactorsKeptForRot;

    // reset communalities
    const factorMatrix1 = factorState.getState().factorMatrix;
    const transposedMatrix = transposeMatrix(factorMatrix1);
    calculateCommunalities(transposedMatrix);

    calculateSigCriterionValues('flag');
    loadingsTableDataPrep(numFactorsKeptForRot);

    // reset manual rotation
    rotationState.setState({ shouldShowJudgeRotDiv: false });
    rotationState.setState({ judgeButtonActive: false });
    rotationState.setState({ showScatterPlotTableDiv: false });
    rotationState.setState({ abFactors: [] });
    rotationState.setState({ highlightRotfactor1: false });
    rotationState.setState({ highlightRotfactor2: false });
    rotationState.setState({ highlightRotfactor3: false });
    rotationState.setState({ highlightRotfactor4: false });
    rotationState.setState({ highlightRotfactor5: false });
    rotationState.setState({ highlightRotfactor6: false });
    rotationState.setState({ highlightRotfactor7: false });
    rotationState.setState({ highlightRotfactor8: false });
    rotationState.setState({ userSelectedRotFactors: [] });
    // hide section 6
    loadingState.setState({ autoFlagHistory: autoFlagHistory });
    outputState.setState({ showOutputFactorSelection: false });
    outputState.setState({ showFactorCorrelationsTable: false });
    outputState.setState({ showStandardErrorsDifferences: false });
    outputState.setState({ showFactorCharacteristicsTable: false });
    outputState.setState({ showDownloadOutputButtons: false });
    outputState.setState({ shouldDisplayFactorVizOptions: false });
    outputState.setState({ displayFactorVisualizations: false });
    outputState.setState({ showDocxOptions: false });
    loadingState.setState({ sendDataToOutputButtonColor: 'orange' });

    return null;
  }, 10);
};

export default autoFlagFactors;
