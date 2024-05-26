import React from 'react';

import { Button, Header, Modal } from 'semantic-ui-react';
import splitBipolarFactor from '../loadingsLogic/splitBipolarFactor';
import SplitBipolarFactorDropdownSelect from './SplitBipolarFactorDropdownSelect';
import loadingState from '../../GlobalState/loadingState';
import { useTranslation } from 'react-i18next';
import getLoadingState from '../../GlobalState/getLoadingState';

const SplitBipolarFactorButtonModal = () => {
  const { t } = useTranslation();

  const handleClose = () => {
    loadingState.showSplitFactorModal = false;
  };

  const handleClick = () => {
    loadingState.showSplitFactorModal = false;
    let bipolarFactorsArray = getLoadingState('bipolarFactorsArray');
    let factorToSplit = getLoadingState('factorToSplit');
    bipolarFactorsArray.push(factorToSplit);
    loadingState.bipolarFactorsArray = [...bipolarFactorsArray];
    splitBipolarFactor();
  };

  const showSplitFactorModal = getLoadingState('showSplitFactorModal');
  if (showSplitFactorModal) {
    return (
      <Modal dimmer={'blurring'} open={showSplitFactorModal} onClose={handleClose}>
        <Header content={t('Factor Loadings Table')} />
        <Modal.Content>
          <SplitBipolarFactorDropdownSelect />
        </Modal.Content>
        <Modal.Actions>
          <Button
            id="splitBipolarModalSubmitButton"
            color="green"
            style={{ margin: 15 }}
            floated="right"
            onClick={handleClick}
            inverted
          >
            {t('Submit')}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
  return null;
};

export default SplitBipolarFactorButtonModal;
