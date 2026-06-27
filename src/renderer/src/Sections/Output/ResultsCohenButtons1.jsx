import { useState } from 'react';
import GeneralButton from '../../Utils/GeneralButton';
import outputState from '../GlobalState/outputState';
import { useTranslation } from 'react-i18next';

const DistStateListButtons = () => {
  const threshold = outputState((state) => state.threshold);
  const updateCohensThreshold = outputState((state) => state.updateCohensThreshold);
  const { t } = useTranslation();

  const resultsCohen10ButtonActive = outputState((state) => state.resultsCohen10Button1Active);
  const resultsCohen20ButtonActive = outputState((state) => state.resultsCohen20Button1Active);
  const resultsCohen30ButtonActive = outputState((state) => state.resultsCohen30Button1Active);
  const resultsCohen40ButtonActive = outputState((state) => state.resultsCohen40Button1Active);
  const resultsCohen50ButtonActive = outputState((state) => state.resultsCohen50Button1Active);
  const resultsCohen60ButtonActive = outputState((state) => state.resultsCohen60Button1Active);
  const resultsCohen70ButtonActive = outputState((state) => state.resultsCohen70Button1Active);
  const resultsCohen80ButtonActive = outputState((state) => state.resultsCohen80Button1Active);
  const resultsCohen90ButtonActive = outputState((state) => state.resultsCohen90Button1Active);
  const resultsCohen100ButtonActive = outputState((state) => state.resultsCohen100Button1Active);
  const updateResultsCohenButtonActive = outputState(
    (state) => state.updateResultsCohenButtons1Active
  );
  const updateResultsCohenButtons1Value = outputState(
    (state) => state.updateResultsCohenButtons1Value
  );
  const resultsCohenButtons2Value = outputState((state) => state.resultsCohenButtons2Value);
  const updateResultsCohenButtons2Value = outputState(
    (state) => state.updateResultsCohenButtons2Value
  );
  const updateResultsCohenButtons2Active = outputState(
    (state) => state.updateResultsCohenButtons2Active
  );

  const clearAllButtons = () => {
    updateResultsCohenButtonActive(10, false);
    updateResultsCohenButtonActive(20, false);
    updateResultsCohenButtonActive(30, false);
    updateResultsCohenButtonActive(40, false);
    updateResultsCohenButtonActive(50, false);
    updateResultsCohenButtonActive(60, false);
    updateResultsCohenButtonActive(70, false);
    updateResultsCohenButtonActive(80, false);
    updateResultsCohenButtonActive(90, false);
    updateResultsCohenButtonActive(100, false);
  };

  const clearAllButtons2 = () => {
    updateResultsCohenButtons2Active(10, false);
    updateResultsCohenButtons2Active(20, false);
    updateResultsCohenButtons2Active(30, false);
    updateResultsCohenButtons2Active(40, false);
    updateResultsCohenButtons2Active(50, false);
    updateResultsCohenButtons2Active(60, false);
    updateResultsCohenButtons2Active(70, false);
    updateResultsCohenButtons2Active(80, false);
    updateResultsCohenButtons2Active(90, false);
    updateResultsCohenButtons2Active(100, false);
  };

  const handleOnclick = (event) => {
    const buttonId = event.target.id;
    clearAllButtons2();
    updateResultsCohenButtons2Value(999);

    if (buttonId === 'cohen10Button') {
      clearAllButtons();
      updateResultsCohenButtonActive(10, true);
      updateResultsCohenButtons1Value(0.1);
    }
    if (buttonId === 'cohen20Button') {
      clearAllButtons();
      updateResultsCohenButtonActive(20, true);
      updateResultsCohenButtons1Value(0.2);
    }
    if (buttonId === 'cohen30Button') {
      clearAllButtons();
      updateResultsCohenButtonActive(30, true);
      updateResultsCohenButtons1Value(0.3);
    }
    if (buttonId === 'cohen40Button') {
      clearAllButtons();
      updateResultsCohenButtonActive(40, true);
      updateResultsCohenButtons1Value(0.4);
    }
    if (buttonId === 'cohen50Button') {
      clearAllButtons();
      updateResultsCohenButtonActive(50, true);
      updateResultsCohenButtons1Value(0.5);
    }
    if (buttonId === 'cohen60Button') {
      clearAllButtons();
      updateResultsCohenButtonActive(60, true);
      updateResultsCohenButtons1Value(0.6);
    }
    if (buttonId === 'cohen70Button') {
      clearAllButtons();
      updateResultsCohenButtonActive(70, true);
      updateResultsCohenButtons1Value(0.7);
    }
    if (buttonId === 'cohen80Button') {
      clearAllButtons();
      updateResultsCohenButtonActive(80, true);
      updateResultsCohenButtons1Value(0.8);
    }
    if (buttonId === 'cohen90Button') {
      clearAllButtons();
      updateResultsCohenButtonActive(90, true);
      updateResultsCohenButtons1Value(0.9);
    }
    if (buttonId === 'cohen100Button') {
      clearAllButtons();
      updateResultsCohenButtonActive(100, true);
      updateResultsCohenButtons1Value(1.0);
    }
  };

  return (
    <div className="flex items-baseline mt-3 ml-6 gap-3">
      <div className="text-xl font-bold">
        {t('cohens')} <i>d</i> {t('level')} 1:
      </div>
      <GeneralButton
        id="cohen10Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen10ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f1"
        data-value={0.1}
      >
        0.1
      </GeneralButton>
      <GeneralButton
        id="cohen20Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen20ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f2"
        data-value={0.2}
      >
        0.2
      </GeneralButton>
      <GeneralButton
        id="cohen30Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen30ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f3"
        data-value={0.3}
      >
        0.3
      </GeneralButton>
      <GeneralButton
        id="cohen40Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen40ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f4"
        data-value={0.4}
      >
        0.4
      </GeneralButton>
      <GeneralButton
        id="cohen50Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen50ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f5"
        data-value={0.5}
      >
        0.5
      </GeneralButton>
      <GeneralButton
        id="cohen60Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen60ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f6"
        data-value={0.6}
      >
        0.6
      </GeneralButton>
      <GeneralButton
        id="cohen70Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen70ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f7"
        data-value={0.7}
      >
        0.7
      </GeneralButton>
      <GeneralButton
        id="cohen80Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen80ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f8"
        data-value={0.8}
      >
        0.8
      </GeneralButton>
      <GeneralButton
        id="cohen90Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen90ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f9"
        data-value={0.9}
      >
        0.9
      </GeneralButton>
      <GeneralButton
        id="cohen100Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen100ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f10"
        data-value={1.0}
      >
        1.0
      </GeneralButton>
    </div>
  );
};

export default DistStateListButtons;

/* 
  begin comparisons
    const lookupArray = [3.891, 3.481, 3.291, 2.807, 2.575, 1.96, 1.645, 1.44, 1.28];
  
    const pValuesTextArray = [
    "P < 0.0001",
    "P < 0.0005",
    "P < 0.001",
    "P < 0.005"
    "P < 0.01",
    "P < 0.05",
    "P < 0.1",
    "P < 0.15"
    "P < 0.2"
  ];
  */
