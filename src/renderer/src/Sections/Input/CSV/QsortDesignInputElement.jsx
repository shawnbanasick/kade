import { useState, useEffect } from 'react';
import InputDiv from './InputDiv';
import convertQsortObjectToArray from '../oldCsv/convertQsortObjectToArray';
import calcMultiplierArrayT2 from '../Excel/excelLogic/calcMultiplierArrayT2';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';
import coreState from '../../GlobalState/coreState';

const QsortDesignInputElement = (props) => {
  const { t } = useTranslation();
  const updateMultiplierArray = coreState((state) => state.updateMultiplierArray);
  const updateQSortPattern = coreState((state) => state.updateQSortPattern);
  const updateQSortPatternObject = coreState((state) => state.updateQSortPatternObject);
  const updateIsQsortPatternLoaded = inputState((state) => state.updateIsQsortPatternLoaded);
  const qSortPatternObject = coreState((state) => state.qSortPatternObject);
  const isForcedQsortPattern = inputState((state) => state.isForcedQsortPattern);
  const numStatements = coreState((state) => state.numStatements);

  const multiplierArray = coreState((state) => state.multiplierArray);

  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(false);
  const [inputButtonsDisabled, setInputButtonsDisabled] = useState(false);
  const [patternConfirmed, setPatternConfirmed] = useState(false);

  const calcQsortDesign = (event) => {
    let columnName = event.target.name;

    if (isNaN(columnName) && columnName.includes('M')) {
      if (columnName.charAt(0) === 'M') {
        columnName = +columnName.replace('M', '-');
      }
    }
    // set new key - value
    qSortPatternObject[columnName] = event.target.value;

    // process array for completeness and UI feedback
    const qSortPattern = convertQsortObjectToArray(qSortPatternObject);
    const multiplierArray = calcMultiplierArrayT2([...qSortPattern]);

    updateMultiplierArray(multiplierArray);
    updateQSortPattern(qSortPattern);
    updateQSortPatternObject(qSortPatternObject);
  };

  // new from version 1.3.0 => always require multiplierArray input
  const showForcedInput = true;

  // Determine background color class based on inputColor
  const sum = [...multiplierArray].reduce((sum, value) => sum + value, 0);

  useEffect(() => {
    if (sum === numStatements) {
      setConfirmButtonDisabled(false);
    } else {
      setConfirmButtonDisabled(true);
    }
  }, [sum, numStatements]);

  const getBackgroundColorClass = () => {
    if (sum === numStatements) {
      return 'bg-[white]';
    }
    return 'bg-[yellow]';
  };
  const getButtonBackgroundColor = () => {
    if (patternConfirmed) {
      return 'bg-primary-button';
    }
    if (sum === numStatements) {
      return 'bg-[orange]';
    }
    return 'bg-grey-button';
  };
  const handleConfirm = () => {
    updateIsQsortPatternLoaded(false);
    setPatternConfirmed(true);
    setInputButtonsDisabled(true);
    console.log('Qsort pattern confirmed');
  };

  if (!isForcedQsortPattern) {
    return (
      <div className="mt-2.5 flex text-black flex-col col-start-1 w-[78vw] gap-1">
        <div className="flex  items-start gap-2">
          <div
            className={`${getBackgroundColorClass()} text-black text-xl mb-1.5 w-full max-w-[800px] pt-4 px-1.5 h-[50px] mt-2.5 rounded`}
          >
            <div className="flex flex-row text-black font-bold w-[800px] pl-1">
              <div className="w-[25px]">5.</div>{' '}
              <div className="w-[40vw] text-black text-[clamp(0.8rem,1.5vw,1.2rem)] text-left">
                {t('Q Sort Pattern - Number of Statements in Each Column')}
              </div>
              <button
                onClick={handleConfirm}
                disabled={confirmButtonDisabled}
                className={
                  getButtonBackgroundColor() +
                  ' text-gray px-5 py-1 rounded self-center   hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent]'
                }
              >
                {t('Confirm')}
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-1 justify-left flex-wrap pl-5">
          <InputDiv
            label={'-6'}
            name={'0'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[0]}
          />
          <InputDiv
            label={'-5'}
            name={'1'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[1]}
          />
          <InputDiv
            label={'-4'}
            name={'2'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[2]}
          />
          <InputDiv
            label={'-3'}
            name={'3'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[3]}
          />
          <InputDiv
            label={'-2'}
            name={'4'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[4]}
          />
          <InputDiv
            label={'-1'}
            name={'5'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[5]}
          />
          <InputDiv
            label={'0'}
            name={'6'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[6]}
          />
          <InputDiv
            label={'1'}
            name={'7'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[7]}
          />
          <InputDiv
            label={'2'}
            name={'8'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[8]}
          />
          <InputDiv
            label={'3'}
            name={'9'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[9]}
          />
          <InputDiv
            label={'4'}
            name={'10'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[10]}
          />
          <InputDiv
            label={'5'}
            name={'11'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[11]}
          />
          <InputDiv
            label={'6'}
            name={'12'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[12]}
          />
          <InputDiv
            label={'7'}
            name={'13'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[13]}
          />
          <InputDiv
            label={'8'}
            name={'14'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[14]}
          />
          <InputDiv
            label={'9'}
            name={'15'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[15]}
          />
          <InputDiv
            label={'10'}
            name={'16'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[16]}
          />
          <InputDiv
            label={'11'}
            name={'17'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[17]}
          />
          <InputDiv
            label={'12'}
            name={'18'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[18]}
          />
          <InputDiv
            label={'13'}
            name={'19'}
            onChangeCallback={calcQsortDesign}
            disabled={inputButtonsDisabled}
            value={multiplierArray[19]}
          />
        </div>
      </div>
    );
  }
  return <div />;
};

export default QsortDesignInputElement;
