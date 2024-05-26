import React from 'react';
import { view, store } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import state from '../../store';

const localStore = store({ state });

const DisplayState = () => {
  const result = Object.keys(state).map((key) => {
    if (typeof state[key] === 'function') {
      return [key, 'function'];
    }
    if (typeof state[key] === 'object') {
      return [key, 'array or object'];
    }
    return [key, state[key].toString()];
  });
  localStore.state = result;
  return (
    <OrderedList>
      {localStore.state.map((value, index) => (
        <li style={{ width: 1150, wordWrap: 'break-word' }} key={value + index.toString()}>
          {value[0]}
          {': '}
          {value[1]}
        </li>
      ))}
    </OrderedList>
  );
};

export default DisplayState;

const OrderedList = styled.ul`
  width: 80%;
  margin-top: 50px;
`;
