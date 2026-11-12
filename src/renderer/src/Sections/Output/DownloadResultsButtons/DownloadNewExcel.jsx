import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import XlsxIcon from '../../images/XLSX_Icon2.svg';
import outputState from '../../GlobalState/outputState';
import calcState from '../../GlobalState/calcState';
import cloneDeep from 'lodash/cloneDeep';
import coreState from '../../GlobalState/coreState';

const DownloadResultsAsExcel = () => {
  const { t } = useTranslation();
  const updateShowDocxOptions = outputState((state) => state.updateShowDocxOptions);
  const updateDownloadDocxButtonActive = outputState(
    (state) => state.updateDownloadDocxButtonActive
  );
  const userSelectedFactors = outputState((state) => state.userSelectedFactors);
  const dataXlsxPrep = calcState((state) => state.outputData);
  const dataXlsx = cloneDeep(dataXlsxPrep);
  const projectName = coreState((state) => state.projectName);
  const powerSetDiffsNumber = calcState((state) => state.powerSetDiffsNumber);

  const handleClick = async () => {
    console.log('DownloadResultsAsExcel button clicked');
    if (userSelectedFactors.length === 0) {
      throw new Error('No factors selected');
      return;
    }

    const textObject = {
      projectInformation: t('Project Information'),
      statements: t('Statements'),
      qSorts: t('Q Sorts'),
      correlationMatrix: t('Correlation Matrix'),
      unrotatedFactorMatrix: t('Unrotated Factor Matrix'),
      cumulativeCommunalities: t('Cumulative Communalities'),
      factorMatrix: t('Factor Matrix'),
      factorLoadingsTable: t('Factor Loadings Table'),
      freeDistribution: t('Free Distribution'),
      statementRankings: t('Statement Rankings'),
      consensusVsDifference: t('Consensus vs. Difference'),
      factorCharacteristics: t('Factor Characteristics'),
      standardErrors: t('Standard Errors'),
      weights: t('Weights'),
      factorScoreCorrelations: t('Factor Score Correlations'),
      factorWorksheet: t('Factor Worksheet'),
      correlations: t('Correlations'),
      factorName: t('Factor Name'),
      factorNumber: t('Factor Number'),
      conDist: t('Consensus-Disagreement'),
      distinguishing: t('Distinguishing'),
      consensus: t('Consensus'),
      relativeRankings: t('Relative Rankings'),
    };

    console.log('dataXlsx:', dataXlsx);

    const dataContent = {
      type: 'ExcelResults',
      data: dataXlsx,
      projectName: projectName,
      userSelectedFactors: userSelectedFactors,
      powerSetDiffsNumber: powerSetDiffsNumber,
      textObject: textObject,
    };

    const newBlob = new Blob([JSON.stringify(dataContent)], { type: 'text/plain' });
    const arrayBuffer = await new Response(newBlob).arrayBuffer();

    try {
      window.bridge.sendLargeData('large-data', arrayBuffer, 'path');
    } catch (error) {
      console.error('Failed to export Excel Results file:', error);
    }
    updateShowDocxOptions(false);
    updateDownloadDocxButtonActive(false);
  };

  return (
    <GeneralButton
      id="downloadResultsAsExcelButton"
      onClick={handleClick}
      className="w-fit min-w-62.5  bg-grey-button"
    >
      <div className="flex flex-row justify-center items-center text-[22px]  h-full w-full">
        <div className="flex justify-center  items-center mr-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-[17px] w-[17px] fill-current"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
        </div>
        {t('Spreadsheet')}
      </div>
    </GeneralButton>
  );
};

export default DownloadResultsAsExcel;
