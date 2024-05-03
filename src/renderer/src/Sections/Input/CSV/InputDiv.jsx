import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import React from 'react';

const InputDiv = (props) => {
  const saveInputValueToState = (event) => {
    props.onChangeCallback(event);
  };

  return (
    <InputColumn>
      <StyledLabel>{props.label}</StyledLabel>
      <StyledInput
        type="text"
        name={props.name}
        onChange={saveInputValueToState}
        value={props.value}
      />
    </InputColumn>
  );
};

export default view(InputDiv);

const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  width: 35px;
  height: 55px;
  border: 1px solid darkgray;
  background-color: #d6dbe0;
  padding-right: 1px;
  padding-top: 5px;
`;

const StyledInput = styled.input`
  width: 26px;
  text-align: right;
  margin-left: 4px;
`;

const StyledLabel = styled.label`
  margin-left: 4px;
  text-align: center;
  padding-right: 1px;
`;
