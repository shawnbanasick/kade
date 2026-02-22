import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import appState from '../GlobalState/appState';
import GeneralButton from '../../Utils/GeneralButton';

// TODO - fix update modal
const ipc = window.electron.ipcRenderer;

const UpdateModal = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const changes = appState((state) => state.changes);
  const updateVersion = appState((state) => state.updateVersion);
  const updateChanges = appState((state) => state.updateChanges);

  if (!Array.isArray(changes)) {
    updateChanges([]);
  }

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const skipThisUpdate = () => {
    setModalOpen(false);
    ipc.send('skip-update-confirmed', `skip`);
    appState.showUpdateModal = false;
  };

  const updateItems = changes.map((item) => <li key={item}>{item}</li>);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        className="box-border p-[10px] w-full h-[75px] bg-[#d6dbe0] text-black border-none text-left transition-all duration-[2s] hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]"
      >
        <span className="shadow-[inset_0_-20px_0_#ffc04c,inset_0_-17px_0_#ffc04c]">
          {t('Update Available')}
        </span>
      </button>

      {/* Modal */}
      <dialog className={`modal ${modalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box bg-gray-800 text-neutral-content w-[600px]">
          <div className="text-3xl text-center font-bold mb-4">
            {`${t('Update Available')} — Version ${updateVersion}`}
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{`${t('Changes in this version')}:`}</h2>
            <ul className="list-disc list-inside text-lg">{updateItems}</ul>
          </div>
          <div className="flex justify-between gap-4">
            <GeneralButton onClick={handleClose} className="bg-primary-button">
              {t('Close')}
            </GeneralButton>
            <GeneralButton onClick={skipThisUpdate} className="bg-orange-400 text-black">
              {t('Skip This Update')}
            </GeneralButton>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/shawnbanasick/kade"
            >
              <GeneralButton
                id="skipThisUpdateButton"
                onClick={handleClose}
                className="bg-orange-400 text-black"
              >
                {t('Go To Download Page')}
              </GeneralButton>
            </a>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleClose}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default UpdateModal;
