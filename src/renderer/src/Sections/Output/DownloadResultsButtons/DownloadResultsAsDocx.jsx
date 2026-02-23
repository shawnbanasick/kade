import { useState } from 'react';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import createOutputDoc from '../downloadDocxLogic/createOutputDoc';
import outputState from '../../GlobalState/outputState';
import cloneDeep from 'lodash/cloneDeep';

const DownloadResultsAsDocx = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const userSelectedFactors = cloneDeep(outputState((state) => state.userSelectedFactors));
  const useZip = outputState((state) => state.willIncludeDataFiles);

  const handleClose = () => setModalOpen(false);

  const translatedTextObj = {
    projectOverTxt: t('Project Overview'),
    projectLogTxt: t('Project Log'),
    downloadTxt: t('Analysis results downloaded on'),
    correlationMatrixTxt: t('Correlation Matrix'),
    diagonalText: t('Diagonal Entries are Standard Errors within Factors'),
    contributingText: t('Contributing Q Sorts'),
    relativeWeightsText: t('Relative Weights'),
    factorZScoresTxt: t("Factor Z-scores, Q sort values, and contributors' raw sort values"),
    flaggedFactorLoadingsText: t(
      'Flagged factor loadings are listed using bold font and orange highlighting'
    ),
    contTxt: t('cont'),
    noDistinguishingText: t('No distinguishing statements for this factor'),
  };

  const handleOpen = () => {
    if (userSelectedFactors.length === 0) {
      setModalOpen(true);
    } else {
      createOutputDoc(translatedTextObj);
    }
  };

  const buttonText = useZip ? t('Download KADE ZIP File') : t('Download DOCX File');

  return (
    <>
      {/* Trigger Button */}
      <GeneralButton
        id="downloadResultsAsDocxButton"
        onClick={handleOpen}
        className="flex justify-center items-center h-[30px] p-1 ml-5! w-fit min-w-[270px] bg-grey-button mt-[20px]"
      >
        <div className="flex flex-row gap-3 justify-center items-center text-[16px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-[17px] w-[17px] fill-current mb-1"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          {buttonText}
        </div>
      </GeneralButton>

      {/* Modal */}
      <dialog className={`modal ${modalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box bg-gray-800 text-neutral-content w-[600px]">
          <div className="text-3xl text-center font-bold mb-4">{t('Analysis Output')}</div>
          <div className="mb-6">
            <p className="text-2xl">{t('Select the factors to output first')}</p>
          </div>
          <div className="flex justify-end">
            <GeneralButton
              id="downloadResultsAsCsvModalGotItButton"
              onClick={handleClose}
              className="bg-primary-button"
            >
              {t('Got it')}
            </GeneralButton>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleClose}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default DownloadResultsAsDocx;
