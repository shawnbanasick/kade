import { useState } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

const ExtendedErrorModal = () => {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  // Global State
  const extendedErrorMessage = inputState((state) => state.extendedErrorMessage);
  const errorStackTrace = inputState((state) => state.errorStackTrace);

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
      open={modalOpen}
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

export default ExtendedErrorModal;

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
