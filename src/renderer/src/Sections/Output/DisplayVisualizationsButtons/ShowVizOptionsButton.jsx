import GeneralButton from '../../../Utils/GeneralButton';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import outputState from '../../GlobalState/outputState';
import vizState from '../../GlobalState/vizState';
import createFactorVizDataObjectForProps from '../FactorVisualizations/createFactorVizDataObjectForProps';

import captureFactorVizImages from '../FactorVisualizations/captureFactorVizImages';

const DisplayVisualizationsButtons = () => {
  const { t } = useTranslation();
  // hide button is only one factor selected
  const userSelectedFactors = outputState((state) => state.userSelectedFactors);
  const shouldDisplayFactorVizOptions = outputState((state) => state.shouldDisplayFactorVizOptions);
  const displayOutputTabContent = outputState((state) => state.displayOutputTabContent);
  const addFactorsSavedImage = outputState((state) => state.addFactorsSavedImage);
  const factorVizOptions = vizState((state) => state.factorVizOptions);
  const factorData = createFactorVizDataObjectForProps({ ...factorVizOptions });
  const dispatchProps = [...factorData];

  const updateShouldDisplayFactorVizOptions = outputState(
    (state) => state.updateShouldDisplayFactorVizOptions
  );

  let shouldDisplay = true;
  if (userSelectedFactors.length < 2) {
    shouldDisplay = false;
  }

  const notify = async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    await toast.success(<div>{t('Current graph added to KADE Zip')}</div>, {
      autoClose: true,
      position: 'bottom-right',
      closeOnClick: true,
      draggable: true,
      theme: 'light',
      style: {
        background: '#fff',
        color: 'dark-gray',
        outline: '1px solid #ccc',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    });
  };

  const handleOpenVizOptions = () => {
    // getState
    const shouldShow = !shouldDisplayFactorVizOptions;
    updateShouldDisplayFactorVizOptions(shouldShow);
  };

  const handleSaveToZip = async () => {
    console.log('handleSaveToZip called');
    const images = await captureFactorVizImages({ scale: 1 }, dispatchProps);
    console.log(images, 'images in handleSaveToZip');
    addFactorsSavedImage(images);
    notify();
  };

  // getState
  const showDownloadOutputButtons = outputState((state) => state.showDownloadOutputButtons);

  if (displayOutputTabContent && shouldDisplay) {
    return (
      <>
        <ToastContainer transition={Zoom} />
        <div className="flex flew-row pl-33.5 justify-left items-center gap-5 w-full h-7.5">
          <GeneralButton
            id="viewVisualizationsDisplayOptions"
            onClick={handleOpenVizOptions}
            className="flex justify-center items-center  h-7.5 w-fit min-w-65 bg-grey-button"
          >
            <div className="flex flex-row justify-center items-center gap-2">
              <svg
                xmlns="http://w3.org"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              {shouldDisplayFactorVizOptions
                ? t('Hide Display Options')
                : t('View Display Options')}
            </div>
          </GeneralButton>
          <GeneralButton
            id="viewVisualizationsDisplayOptions"
            onClick={handleSaveToZip}
            className="flex justify-center items-center  h-7.5 w-fit min-w-65 bg-grey-button"
          >
            <div className="flex flex-row justify-center items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 20H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10l4 4v3" />
                <path d="M7 3v4h7V3" />
                <path d="M7 20v-6h4" />
                <path d="M18 14v7" />
                <path d="M14.5 17.5h7" />
              </svg>
              {t('Save to KADE Zip')}
            </div>
          </GeneralButton>
        </div>
      </>
    );
  }
};

export default DisplayVisualizationsButtons;
