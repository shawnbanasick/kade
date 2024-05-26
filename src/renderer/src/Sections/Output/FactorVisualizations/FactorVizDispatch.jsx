import React from 'react';

import FactorViz from './FactorViz';
import createFactorVizDataObjectForProps from './createFactorVizDataObjectForProps';

import getVizState from '../../GlobalState/getVizState';
import getOutputState from '../../GlobalState/getOutputState';

const styles = {
  width: '100%',
  height: 1200,
  padding: 30,
  margin: 10,
};

// todo - need to calculate dynamic height here for styles

const FactorVizDispatch = (props) => {
  // getState
  const factorVizOptions = getVizState('factorVizOptions');
  const factorData = createFactorVizDataObjectForProps(factorVizOptions);
  const shouldDisplayFactorViz = getOutputState('displayFactorVisualizations');

  if (shouldDisplayFactorViz) {
    return (
      <div>
        {factorData.map((i, index) => (
          <div key={`key${index.toString()}`}>
            <FactorViz key={`viz${index}`} {...factorData[index]} {...props} {...styles} />
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default FactorVizDispatch;
