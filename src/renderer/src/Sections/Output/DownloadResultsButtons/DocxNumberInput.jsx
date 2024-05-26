import React, { useState } from 'react';
import styled from 'styled-components';

import outputState from '../../GlobalState/outputState';
import { useTranslation } from 'react-i18next';

const DocxNumberInput = (props) => {
  const { t } = useTranslation();

  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return null;
    }
    // const key = props.name;
    setShowWarning(false);
    const upperLimit = props.upperLimit;
    const lowerLimit = props.lowerLimit;
    if (value < lowerLimit || value > upperLimit) {
      setShowWarning(true);
    } else {
      outputState.correlationThreshold = value;
    }
  };

  const warningMessage = `${t('Lower Limit')}: ${props.lowerLimit}, ${t(
    'Upper Limit'
  )}: ${props.upperLimit}`;

  return (
    <UserNumberContainer>
      <NumberInput
        placeholder={props.placeholder}
        name={props.name}
        step={props.step}
        value={outputState.correlationThreshold}
        onChange={handleChange}
        className="optionsInput"
      />
      {showWarning ? <NumberWarningMessage>{warningMessage}</NumberWarningMessage> : null}
    </UserNumberContainer>
  );
};

export default DocxNumberInput;

const NumberInput = styled.input.attrs({
  type: 'number',
})`
  color: black;
  cursor: pointer;
  margin-bottom: 0;
  width: 45px;
  border-radius: 5px;
  box-sizing: border-box;
  height: 25px;
  border: 1px solid lightgray;
  box-shadow: none;
  outline: none;
  transition: 0.15s;
  text-align: center;
  &:hover {
    outline: none;
    background: none;
    box-shadow: none;
  }
`;

const NumberWarningMessage = styled.div`
  margin-left: 10px;
  padding-top: 4px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: lightpink;
  color: black;
  height: 25px;
  width: auto;
  /* width: 225px; */
`;

const UserNumberContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90px;
`;
