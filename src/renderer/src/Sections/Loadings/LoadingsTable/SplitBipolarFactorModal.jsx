import { Button, Header, Modal } from 'semantic-ui-react';
import splitBipolarFactor from '../loadingsLogic/splitBipolarFactor';
import SplitBipolarFactorDropdownSelect from './SplitBipolarFactorDropdownSelect';
import { useTranslation } from 'react-i18next';
import loadingState from '../../GlobalState/loadingState';

const SplitBipolarFactorButtonModal = () => {
  const { t } = useTranslation();
  const updateShowSplitFactorModal = loadingState((state) => state.updateShowSplitFactorModal);
  const updateBipolarFactorsArray = loadingState((state) => state.updateBipolarFactorsArray);
  let bipolarFactorsArray = loadingState((state) => state.bipolarFactorsArray);
  let factorToSplit = loadingState((state) => state.factorToSplit);
  const showSplitFactorModal = loadingState((state) => state.showSplitFactorModal);

  const handleClose = () => {
    updateShowSplitFactorModal(false);
  };

  const handleClick = () => {
    updateShowSplitFactorModal(false);
    bipolarFactorsArray.push(factorToSplit);
    updateBipolarFactorsArray([...bipolarFactorsArray]);
    splitBipolarFactor();
  };

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
