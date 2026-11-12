import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';
import calcState from '../../GlobalState/calcState';
import cloneDeep from 'lodash/cloneDeep';
import coreState from '../../GlobalState/coreState';
import createDocxOptions from '../downloadZipLogic/createDocxOptions';
import createCoreOutputTextFiles from '../downloadZipLogic/createCoreOutputTextFiles';

const DownloadResultsAsExcel = () => {
  const { t } = useTranslation();
  const updateShowDocxOptions = outputState((state) => state.updateShowDocxOptions);
  const updateDownloadDocxButtonActive = outputState(
    (state) => state.updateDownloadDocxButtonActive
  );
  const userSelectedFactors = outputState((state) => state.userSelectedFactors);
  const dataXlsxPrep = calcState((state) => state.outputData);
  const dataXlsx = cloneDeep(dataXlsxPrep);
  const powerSetDiffsNumber = calcState((state) => state.powerSetDiffsNumber);

  const projectName = coreState((state) => state.projectName);
  const statements = coreState((state) => state.statements);
  const mainDataObject = coreState((state) => state.mainDataObject);
  const multiplierArray = coreState((state) => state.multiplierArray);
  const serializedSVGScree1 = outputState((state) => state.serializedSVGScree1);
  const serializedPNGScree1 = outputState((state) => state.serializedPNGScree1);

  const textOutputFiles = createCoreOutputTextFiles(
    mainDataObject,
    statements,
    projectName,
    multiplierArray
  );

  const handleClick = async () => {
    // console.log('DownloadResultsAsExcel button clicked');
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

    // console.log('dataXlsx:', dataXlsx);

    const excelDataContent = {
      type: 'ExcelResults',
      data: [...dataXlsx],
      projectName: projectName,
      userSelectedFactors: userSelectedFactors,
      powerSetDiffsNumber: powerSetDiffsNumber,
      textObject: textObject,
    };

    const docDataContent = createDocxOptions();
    // docDataContent.projectName = projectName;
    docDataContent.data = [...dataXlsx];

    const dataContent = {
      type: 'ZipResults',
      excel: excelDataContent,
      word: docDataContent,
      text: textOutputFiles,
      screeSvg1: serializedSVGScree1,
      screePng1: serializedPNGScree1,
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
      console.error('Failed to export Zip Results file:', error);
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
        {t('KADE Zip')}
      </div>
    </GeneralButton>
  );
};

export default DownloadResultsAsExcel;
