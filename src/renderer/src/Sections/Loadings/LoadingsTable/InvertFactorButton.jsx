import React from 'react';
import { view } from '@risingstack/react-easy-state';
import { Button, Header, Modal } from 'semantic-ui-react';
import invertFactor from '../loadingsLogic/invertFactor';
import InvertFactorDropdownSelect from './InvertFactorDropdownSelect';
import { useTranslation } from 'react-i18next';
import loadingState from '../../GlobalState/loadingState';
import getLoadingState from '../../GlobalState/getLoadingState';

const InvertFactorButtonModal = () => {
  const { t } = useTranslation();

  const style1 = { display: 'flex', width: 500 };
  const style2 = { alignSelf: 'flexStart' };
  const style3 = { alignSelf: 'flexEnd' };
  const style4 = { width: 550 };

  const doInvertFactor = () => {
    loadingState.showInvertFactorModal = false;
    // send localStore data here - begin inversion process
    invertFactor();
  };

  const quit = () => {
    loadingState.showInvertFactorModal = false;
  };

  const showInvertFactorModal = getLoadingState('showInvertFactorModal');
  if (showInvertFactorModal) {
    return (
      <Modal dimmer={'blurring'} open={showInvertFactorModal} onClose={quit} style={style4}>
        <Header content={t('Factor Loadings Table')} />
        <Modal.Content>
          <InvertFactorDropdownSelect />
        </Modal.Content>
        <Modal.Actions>
          <div style={style1}>
            <Button style={style2} color="blue" onClick={quit} inverted>
              {t('Cancel')}
            </Button>
            <Button
              style={style3}
              id="invertFactorSubmitButton"
              color="green"
              floated="right"
              onClick={doInvertFactor}
              inverted
            >
              {t('Submit')}
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
  return null;
};

export default view(InvertFactorButtonModal);
