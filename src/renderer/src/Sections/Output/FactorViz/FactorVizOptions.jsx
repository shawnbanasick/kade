import React from 'react';

import { Transition } from 'semantic-ui-react';
import DownloadsPanel from './DownloadsPanel';
import CardSettingsPanel from './CardSettingsPanel';
import DistinguishingPanel from './DistinguishingPanel';
import GeneralOptionsPanel from './GeneralOptionsPanel';
import StatementsSettingsPanel from './StatementsSettingsPanel';

import outputState from '../../GlobalState/outputState';

const styles = {
  width: '90%',
  maxWidth: 920,
  height: 1100,
  border: '2px solid #666',
  padding: 20,
  marginLeft: 20,
};

const FactorVizOptions = () => {
  const shouldDisplayFactorVizOptions = outputState.shouldDisplayFactorVizOptions;
  return (
    <Transition visible={shouldDisplayFactorVizOptions} animation="fade" duration={1000}>
      <div style={styles} className="FactorVizDiv">
        <GeneralOptionsPanel />
        <CardSettingsPanel />
        <StatementsSettingsPanel />
        <DistinguishingPanel />
        <DownloadsPanel />
      </div>
    </Transition>
  );
};

export default FactorVizOptions;
