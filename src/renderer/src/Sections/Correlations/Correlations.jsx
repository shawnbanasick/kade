import { useEffect } from 'react';
import CorrelationTable from './CorrelationTable/CorrelationTable';
import ErrorNotification from '../Input/ErrorChecking/ErrorNotification';
import { useTranslation } from 'react-i18next';
import correlationState from '../GlobalState/correlationState';
import appState from '../GlobalState/appState';
import coreState from '../GlobalState/coreState';
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

  useEffect(() => {
    updateIsCorrelationsButtonGreen(true);
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
            <div className="mt-12.5 ml-5 text-[22px] pt-15">
              {t("Verify Q sorts in section '2. Data'")}
            </div>
          )}
        </div>
        <div className="justify-self-start" style={{ gridArea: 'main' }}>
          {showCorrelationMatrix ? (
            <CorrelationTable />
          ) : (
            <div className="mt-12.5 ml-5 text-[22px] pt-15">{t('No correlations calculated')}</div>
          )}
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
          <MainContent />,
        </div>
      ),
    },
    {
      title: t('Heatmap'),
      content: (
        <div>
          <div className="text-5xl mt-4">{t('Correlation Heatmap')}</div>

          {/* <div className="flex w-[500px] ml-[150px] text-4xl">{`${t('Correlation Heatmap')}`}</div> */}
          <HeatmapMain
            width={numQsorts < 20 ? numQsorts * 60 : numQsorts * 40}
            height={numQsorts < 20 ? numQsorts * 60 : numQsorts * 40}
          />
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
