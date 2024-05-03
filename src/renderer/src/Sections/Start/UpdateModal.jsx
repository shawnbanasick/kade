import { React, useState } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import appState from '../GlobalState/appState';
const ipc = window.electron.ipcRenderer;

const UpdateModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const changes = appState((state) => state.changes);
  const updateVersion = appState((state) => state.changes);
  const updateChanges = appState((state) => state.updateChanges);
  // const updateUpdateVersion = appState((state) => state.updateChanges);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const skipThisUpdate = () => {
    // appState.installedVersion = getAppState("updateVersion");
    setModalOpen(false);
    ipc.send('skip-update-confirmed', `skip`);
    appState.showUpdateModal = false;
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const { t } = useTranslation();

  if (!Array.isArray(changes)) {
    updateChanges([]);
  }
  console.log('updateVersion', updateVersion);

  const updateItems = changes.map((item) => <li key={item}>{item}</li>);

  return (
    <React.Fragment>
      <Modal
        dimmer={'blurring'}
        trigger={
          <UpdateButton onClick={handleOpen}>
            <UpdateText>{t('Update Available')}</UpdateText>
          </UpdateButton>
        }
        open={modalOpen}
        className="wrapper1"
        onClose={handleClose}
        basic
        size={'small'}
      >
        <Header content={`${t('Update Available')} --- Version ${updateVersion}`} />
        <Modal.Content>
          <h2> {`${t('Changes in this version')}: `}</h2>
          <ul>{updateItems}</ul>
        </Modal.Content>
        <Modal.Actions>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button size={'big'} color="blue" onClick={handleClose} inverted>
              {t('Close')}
            </Button>
            <Button color="orange" onClick={skipThisUpdate} inverted size={'big'}>
              {t('Skip This Update')}
            </Button>

            <GoToDownloadPageAnchor
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/shawnbanasick/kade"
            >
              <Button
                id="skipThisUpdateButton"
                size={'big'}
                // style={{ alignSelf: "flexEnd", marginLeft: 220 }}
                color="orange"
                onClick={handleClose}
                inverted
              >
                {t('Go To Download Page')}
              </Button>
            </GoToDownloadPageAnchor>
          </div>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default UpdateModal;

const UpdateButton = styled.button`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  height: 75px;
  /* background: orange; */
  background: #d6dbe0;
  /* opacity: 0.6; */
  color: black;
  border: none;
  text-align: left;
  transition: 2s ease all;

  &:hover {
    box-shadow:
      inset 0 0 0 4px #666,
      0 0 1px transparent;
  }
`;

const UpdateText = styled.span`
  box-shadow:
    inset 0 -20px 0 #ffc04c,
    inset 0 -17px 0 #ffc04c;
`;

const GoToDownloadPageAnchor = styled.a``;
