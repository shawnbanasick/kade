import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import appState from '../GlobalState/appState';
import coreState from '../GlobalState/coreState';
import correlationState from '../GlobalState/correlationState';

import CorrelationTable from './CorrelationTable/CorrelationTable';
import ErrorNotification from '../Input/ErrorChecking/ErrorNotification';
import HeatmapMain from './HeatmapMain';

const Correlations = () => {
  const { t } = useTranslation();

  // const qSortPattern = coreState((state) => state.qSortPattern);
  const showCorrelationMatrix = correlationState((state) => state.showCorrelationMatrix);
  const hasDataBeenConfirmed = appState((state) => state.hasDataBeenConfirmed);
  const correlationTabActive = correlationState((state) => state.correlationTabActive);
  const updateCorrelationTabActive = correlationState((state) => state.updateCorrelationTabActive);
  const numQsorts = coreState((state) => state.numQsorts);
  const updateIsCorrelationsButtonGreen = appState(
    (state) => state.updateIsCorrelationsButtonGreen
  );
  const isDataButtonGreen = appState((state) => state.isDataButtonGreen);
  const isInputButtonGreen = appState((state) => state.isInputButtonGreen);

  useEffect(() => {
    if (isDataButtonGreen && isInputButtonGreen) {
      updateIsCorrelationsButtonGreen(true);
    }
  }, []);

  // Handler for tab clicks
  const handleTabClick = (tabId) => {
    updateCorrelationTabActive(tabId);
  };

  const MainContent = () => {
    return (
      <div
        className={`grid grid-cols-1 text-black  pl-5 justify-items-start items-center bg-white   overflow-auto select-none transition-all duration-500 linear `}
        style={{
          gridTemplateAreas: `'header header header' 'main main main' 'footer footer footer'`,
        }}
      >
        <div className="justify-self-start" style={{ gridArea: 'header' }}>
          {hasDataBeenConfirmed ? null : (
            <div className="flex flex-col gap-4 items-center justify-center p-2 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="text-[20px] font-bold">
                {t("Verify Q sorts in section '2. Data'")}
              </div>
              <div className="text-[16px]">{t('No correlations calculated')}</div>
            </div>
          )}
        </div>
        <div className="justify-self-start" style={{ gridArea: 'main' }}>
          {showCorrelationMatrix ? <CorrelationTable /> : null}
        </div>
        <ErrorNotification />
      </div>
    );
  };

  const tabs = [
    {
      title: t('Matrix'),
      content: (
        <div>
          <MainContent />
        </div>
      ),
    },
    {
      title: t('Heatmap'),
      content: (
        <div>
          {showCorrelationMatrix ? (
            <>
              <div className="text-4xl mt-4">{t('Correlation Heatmap')}</div>
              <HeatmapMain
                width={numQsorts < 20 ? numQsorts * 60 : numQsorts * 40}
                height={numQsorts < 20 ? numQsorts * 60 : numQsorts * 40}
              />
            </>
          ) : (
            <div className="flex items-center w-[400px] justify-center m-3 p-2 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="p-2 text-[22px]">{t('No correlations calculated')}</div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div
      className={`
        bg-white
        w-full
        box-border
        overflow-auto
        h-full
        transition-[visibility,opacity]
        duration-500
        text-black
      `}
    >
      <div className="tabs tabs-box flex bg-[#d6dbe0] h-[100%] rounded-none">
        <input
          type="radio"
          name="my_tabs_Corr"
          className={`tab basis-[12vw] text-[clamp(1rem,1.5vw,1.1rem)] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${correlationTabActive === 'tab1' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[0].title}
          onClick={() => handleTabClick('tab1')}
        />

        <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[0].content}</div>

        <input
          type="radio"
          name="my_tabs_Corr"
          className={`tab basis-[12vw] text-[clamp(1rem,1.5vw,1.1rem)] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${correlationTabActive === 'tab2' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[1].title}
          onClick={() => handleTabClick('tab2')}
        />

        <div className="tab-content box-border overflow-auto bg-base-100 border-base-300 p-6">
          {tabs[1].content}
        </div>
      </div>
    </div>
  );
};

export default Correlations;
