import FactorsKeptNotification from './FactorKeepSelection/FactorsKeptNotification';
import FireVarimaxButton from './RotationButtons/FireVarimaxButton';
import InitializeJudgementalButton from './RotationButtons/InitializeJudgmentalButton';
import FactorSelectButtons from './FactorKeepSelection/FactorSelectButtons';
import FactorSelectButtonModal from './FactorKeepSelection/FactorSelectButtonModal';
import { useTranslation } from 'react-i18next';
import VarimaxHeywoodWarning from './RotationButtons/VarimaxHeywoodWarning';
import rotationState from '../GlobalState/rotationState';
import JudgementalTitleDiv from './JudgementalRotation/plot/JudgementalTitleDiv';

const Rotation = () => {
  const { t } = useTranslation();

  const optionsTrans = t('Options');
  const varimaxTrans = t('Varimax');
  const judgmentalTrans = t('Judgmental');
  const numberFactorsKeepTrans = t('Select the number of factors to keep for rotation');
  const extractFactorsFirstTrans = t('Extract factors first');
  const updateRotationActiveTabIndex = rotationState((state) => state.updateRotationActiveTabIndex);
  const rotationActiveTabIndex = rotationState((state) => state.rotationActiveTabIndex);
  const showKeepFacForRotButton = rotationState((state) => state.showKeepFacForRotButton);

  // Handler for tab clicks
  const handleTabClick = (tabId) => {
    updateRotationActiveTabIndex(tabId);
  };

  const tabs = [
    {
      title: optionsTrans,
      content: (
        <div>
          <div className="text-4xl mb-6">{t('Rotation Options')}</div>
          <div className="grid bg-white max-w-299.25 select-none grid-rows-[50px_120px_150px_1fr] h-[calc(100vh-75px)]">
            {showKeepFacForRotButton ? (
              <div className="mr-5 mt-2.5 text-[22px]">{numberFactorsKeepTrans}:</div>
            ) : (
              <div className="mr-5 mt-2.5 text-[22px]">{extractFactorsFirstTrans}</div>
            )}
            <div className="flex flex-row">
              <FactorSelectButtons />
              <FactorSelectButtonModal />
            </div>
            <FactorsKeptNotification />
          </div>
        </div>
      ),
    },
    {
      title: varimaxTrans,
      content: (
        <div>
          <div className="bg-white overflow-auto p-1.25 box-border h-[calc(100vh-120px)] select-none">
            <FireVarimaxButton />
            <VarimaxHeywoodWarning />
          </div>
        </div>
      ),
    },
    {
      title: judgmentalTrans,
      content: (
        <div>
          <div className="bg-white overflow-auto pl-1.25  h-full">
            <InitializeJudgementalButton />
            <JudgementalTitleDiv />
          </div>
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
      <div className="tabs tabs-box flex bg-[#d6dbe0] h-full rounded-none">
        <input
          type="radio"
          name="my_tabs_Rot"
          className={`tab basis-[12vw] text-[clamp(1rem,1.5vw,1.1rem)] hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] ${rotationActiveTabIndex === 'tab1' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[0].title}
          onClick={() => handleTabClick('tab1')}
        />

        <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[0].content}</div>

        <input
          type="radio"
          name="my_tabs_Rot"
          className={`tab basis-[12vw] text-[clamp(1rem,1.5vw,1.1rem)] hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] ${rotationActiveTabIndex === 'tab2' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[1].title}
          onClick={() => handleTabClick('tab2')}
        />

        <div className="tab-content box-border overflow-auto bg-base-100 border-base-300 p-6">
          {tabs[1].content}
        </div>

        <input
          type="radio"
          name="my_tabs_Rot"
          className={`tab basis-[12vw] text-[clamp(1rem,1.5vw,1.1rem)] hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] ${rotationActiveTabIndex === 'tab3' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[2].title}
          onClick={() => handleTabClick('tab3')}
        />

        <div className="tab-content h-[calc(100vh-58px)] overflow-auto bg-base-100 border-base-300 p-6 pt-1">
          {tabs[2].content}
        </div>
      </div>
    </div>
  );
};

export default Rotation;
