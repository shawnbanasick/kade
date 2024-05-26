import React, { Component } from 'react';
import { view, store } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import state from '../../store';

const statements = state.getState('statements');
const localStore = store({ statements });

const StatementsInState = () => {
  return (
    <OrderedList>
      {localStore.statements.map((value, index) => (
        <li style={{ width: 1150, wordWrap: 'break-word' }} key={value + index.toString()}>
          {value}
        </li>
      ))}
    </OrderedList>
  );
};

export default StatementsInState;

const OrderedList = styled.ol`
  width: 80%;
  margin-top: 50px;
`;
