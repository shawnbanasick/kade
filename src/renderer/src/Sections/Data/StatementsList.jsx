import { view } from '@risingstack/react-easy-state';
import React from 'react';

const StatementList = (props) => {
  let mapKey = 1;
  return (
    <ol>
      {props.statements.map((listValue) => (
        <li key={mapKey++}>{listValue}</li>
      ))}
    </ol>
  );
};

export default view(StatementList);
