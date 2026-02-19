import { Tab } from 'semantic-ui-react';
import FactorsKeptNotification from './FactorKeepSelection/FactorsKeptNotification';
import JudgementalRotationContainer from './JudgementalRotation/JudgementalRotationContainer';
import FireVarimaxButton from './RotationButtons/FireVarimaxButton';
import InitializeJudgementalButton from './RotationButtons/InitializeJudgmentalButton';
import FactorSelectButtons from './FactorKeepSelection/FactorSelectButtons';
import FactorSelectButtonModal from './FactorKeepSelection/FactorSelectButtonModal';
import { useTranslation } from 'react-i18next';
import VarimaxHeywoodWarning from './RotationButtons/VarimaxHeywoodWarning';
import rotationState from '../GlobalState/rotationState';

const Rotation = () => {
  const { t } = useTranslation();

  const optionsTrans = t('Options');
  const varimaxTrans = t('Varimax');
  const judgmentalTrans = t('Judgmental');
  const numberFactorsKeepTrans = t('Number of factors to keep for rotation');
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
      title: t('Options'),
      content: (
        <div>
          <div className="grid bg-white max-w-[1197px] select-none [grid-template-rows:50px_120px_150px_1fr] h-[calc(100vh-75px)]">
            {showKeepFacForRotButton ? (
              <div className="mr-5 mt-2.5 text-[22px]">{numberFactorsKeepTrans}</div>
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
      title: t('Varimax'),
      content: (
        <div>
          <div className="bg-white overflow-auto p-[5px] box-border h-[calc(100vh-75px)] select-none">
            <FireVarimaxButton />
            <VarimaxHeywoodWarning />
          </div>
        </div>
      ),
    },
    {
      title: t('Judgmental'),
      content: (
        <div>
          <div className="bg-white overflow-auto p-[5px] box-border h-[calc(100vh-75px)] select-none">
            <InitializeJudgementalButton />
            <JudgementalRotationContainer />
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
      `}
    >
      <div className="tabs tabs-box flex bg-[#d6dbe0] h-[100%] rounded-tl-none">
        <input
          type="radio"
          name="my_tabs_Rot"
          className={`tab basis-[12vw] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${rotationActiveTabIndex === 'tab1' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[0].title}
          onClick={() => handleTabClick('tab1')}
        />

        <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[0].content}</div>

        <input
          type="radio"
          name="my_tabs_Rot"
          className={`tab basis-[12vw] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${rotationActiveTabIndex === 'tab2' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[1].title}
          onClick={() => handleTabClick('tab2')}
        />

        <div className="tab-content box-border overflow-auto bg-base-100 border-base-300 p-6">
          {tabs[1].content}
        </div>

        <input
          type="radio"
          name="my_tabs_Rot"
          className={`tab basis-[12vw] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${rotationActiveTabIndex === 'tab3' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[2].title}
          onClick={() => handleTabClick('tab3')}
        />

        <div className="tab-content box-border overflow-auto bg-base-100 border-base-300 p-6">
          {tabs[2].content}
        </div>
      </div>
    </div>
  );
};

export default Rotation;
