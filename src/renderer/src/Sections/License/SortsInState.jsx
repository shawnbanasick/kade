import React, { Component } from 'react';
import { view, store } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import state from '../../store';

const sorts = state.getState('sortsDisplayText');
const localStore = store({ sorts });

const StatementsInState = () => {
  return (
    <OrderedList>
      {localStore.sorts.map((value, index) => (
        <li style={{ width: 1150, wordWrap: 'break-word' }} key={value + index.toString()}>
          {value}
        </li>
      ))}
    </OrderedList>
  );
};

export default view(StatementsInState);

const OrderedList = styled.ol`
  width: 80%;
  margin-top: 50px;
`;
