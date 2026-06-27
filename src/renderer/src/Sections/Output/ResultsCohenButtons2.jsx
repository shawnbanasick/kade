import { useState } from 'react';
import GeneralButton from '../../Utils/GeneralButton';
import outputState from '../GlobalState/outputState';
import { useTranslation } from 'react-i18next';

const DistStateListButtons = () => {
  const threshold = outputState((state) => state.threshold);
  const updateCohensThreshold = outputState((state) => state.updateCohensThreshold);
  const { t } = useTranslation();

  const resultsCohen10ButtonActive = outputState((state) => state.resultsCohen10Button2Active);
  const resultsCohen20ButtonActive = outputState((state) => state.resultsCohen20Button2Active);
  const resultsCohen30ButtonActive = outputState((state) => state.resultsCohen30Button2Active);
  const resultsCohen40ButtonActive = outputState((state) => state.resultsCohen40Button2Active);
  const resultsCohen50ButtonActive = outputState((state) => state.resultsCohen50Button2Active);
  const resultsCohen60ButtonActive = outputState((state) => state.resultsCohen60Button2Active);
  const resultsCohen70ButtonActive = outputState((state) => state.resultsCohen70Button2Active);
  const resultsCohen80ButtonActive = outputState((state) => state.resultsCohen80Button2Active);
  const resultsCohen90ButtonActive = outputState((state) => state.resultsCohen90Button2Active);
  const resultsCohen100ButtonActive = outputState((state) => state.resultsCohen100Button2Active);
  const updateResultsCohenButtons2Active = outputState(
    (state) => state.updateResultsCohenButtons2Active
  );
  const resultsCohenButtons1Value = outputState((state) => state.resultsCohenButtons1Value);

  const clearAllButtons = () => {
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
    console.log('data-value', event.target.dataset.value);
    const dataValue = parseFloat(event.target.dataset.value);

    if (buttonId === 'cohen10Button') {
      clearAllButtons();
      updateResultsCohenButtons2Active(10, true);
      updateResultsCohenButtons2Value(0.1);
    }
    if (buttonId === 'cohen20Button') {
      clearAllButtons();
      updateResultsCohenButtons2Active(20, true);
      updateResultsCohenButtons2Value(0.2);
    }
    if (buttonId === 'cohen30Button') {
      clearAllButtons();
      updateResultsCohenButtons2Active(30, true);
      updateResultsCohenButtons2Value(0.3);
    }
    if (buttonId === 'cohen40Button') {
      clearAllButtons();
      updateResultsCohenButtons2Active(40, true);
      updateResultsCohenButtons2Value(0.4);
    }
    if (buttonId === 'cohen50Button') {
      clearAllButtons();
      updateResultsCohenButtons2Active(50, true);
      updateResultsCohenButtons2Value(0.5);
    }
    if (buttonId === 'cohen60Button') {
      clearAllButtons();
      updateResultsCohenButtons2Active(60, true);
      updateResultsCohenButtons2Value(0.6);
    }
    if (buttonId === 'cohen70Button') {
      clearAllButtons();
      updateResultsCohenButtons2Active(70, true);
      updateResultsCohenButtons2Value(0.7);
    }
    if (buttonId === 'cohen80Button') {
      clearAllButtons();
      updateResultsCohenButtons2Active(80, true);
      updateResultsCohenButtons2Value(0.8);
    }
    if (buttonId === 'cohen90Button') {
      clearAllButtons();
      updateResultsCohenButtons2Active(90, true);
      updateResultsCohenButtons2Value(0.9);
    }
    if (buttonId === 'cohen100Button') {
      clearAllButtons();
      updateResultsCohenButtons2Active(100, true);
      updateResultsCohenButtons2Value(1.0);
    }
  };

  return (
    <div className="flex items-baseline mt-5 ml-6 gap-3">
      <div className="text-xl font-bold">
        {t('cohens')} <i>d</i> {t('level')} 2:
      </div>
      <GeneralButton
        id="cohen10Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen10ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f1"
        disabled={resultsCohenButtons1Value > 0.1 ? true : false}
      >
        0.1
      </GeneralButton>
      <GeneralButton
        id="cohen20Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen20ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f2"
        disabled={resultsCohenButtons1Value > 0.2 ? true : false}
      >
        0.2
      </GeneralButton>
      <GeneralButton
        id="cohen30Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen30ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f3"
        disabled={resultsCohenButtons1Value > 0.3 ? true : false}
      >
        0.3
      </GeneralButton>
      <GeneralButton
        id="cohen40Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen40ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f4"
        disabled={resultsCohenButtons1Value > 0.4 ? true : false}
      >
        0.4
      </GeneralButton>
      <GeneralButton
        id="cohen50Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen50ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f5"
        disabled={resultsCohenButtons1Value > 0.5 ? true : false}
      >
        0.5
      </GeneralButton>
      <GeneralButton
        id="cohen60Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen60ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f6"
        disabled={resultsCohenButtons1Value > 0.6 ? true : false}
      >
        0.6
      </GeneralButton>
      <GeneralButton
        id="cohen70Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen70ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f7"
        disabled={resultsCohenButtons1Value > 0.7 ? true : false}
      >
        0.7
      </GeneralButton>
      <GeneralButton
        id="cohen80Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen80ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f8"
        disabled={resultsCohenButtons1Value > 0.8 ? true : false}
      >
        0.8
      </GeneralButton>
      <GeneralButton
        id="cohen90Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen90ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f9"
        disabled={resultsCohenButtons1Value > 0.9 ? true : false}
      >
        0.9
      </GeneralButton>
      <GeneralButton
        id="cohen100Button"
        onClick={handleOnclick}
        className={`min-w-20 ${resultsCohen100ButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        key="f10"
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
