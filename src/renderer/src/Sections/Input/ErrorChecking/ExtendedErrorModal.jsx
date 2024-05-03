import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import { view, store } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import getInputState from '../../GlobalState/getInputState';
import { useTranslation } from 'react-i18next';

const localStore = store({
  modalOpen: false
});

const handleOpen = () => {
  localStore.modalOpen = true;
};

const handleClose = () => {
  localStore.modalOpen = false;
};

const ExtendedErrorModal = () => {
  const { t } = useTranslation();

  // getState
  const extendedErrorMessage = getInputState('extendedErrorMessage');
  const errorStackTrace = getInputState('errorStackTrace');
  return (
    <Modal
      dimmer={'blurring'}
      trigger={
        <StyledWrapper>
          <Button className="wrapper1" onClick={handleOpen}>
            {t('Error Details')}
          </Button>
        </StyledWrapper>
      }
      open={localStore.modalOpen}
      onClose={handleClose}
      basic
      size="small"
    >
      <Header content="Error Details:" />
      <Modal.Content>
        <div>{extendedErrorMessage}</div>
        <StacktraceDiv>
          <h3>Stacktrace:</h3>
          <pre>{errorStackTrace}</pre>
        </StacktraceDiv>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={handleClose} inverted>
          {t('Return')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default view(ExtendedErrorModal);

const StyledWrapper = styled.div`
  /*
  .wrapper1 {
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      border: 1px solid black;
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
      margin-left: 3px;
    }
  }
  */
`;

const StacktraceDiv = styled.div`
  margin-top: 30px;
`;
