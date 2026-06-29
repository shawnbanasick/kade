import { useEffect } from 'react';
import outputState from '../../GlobalState/outputState';

function Drawer({ isOpen, onClose, children, side = 'right' }) {
  const updateShouldDisplayFactorVizOptions = outputState(
    (state) => state.updateShouldDisplayFactorVizOptions
  );
  // Close on Escape
  useEffect(() => {
    window.electron.ipcRenderer.on('escape-pressed', onClose);
    return () => window.electron.ipcRenderer.removeListener('escape-pressed', onClose);
  }, [onClose]);

  const slideClass = {
    right: isOpen ? 'translate-x-0' : 'translate-x-full',
    left: isOpen ? 'translate-x-0' : '-translate-x-full',
    bottom: isOpen ? 'translate-y-0' : 'translate-y-full',
  }[side];

  const positionClass = {
    right: 'top-0 right-0 h-full w-220',
    left: 'top-0 left-0 h-full w-80',
    bottom: 'bottom-0 left-0 w-full h-64',
  }[side];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-200
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed ${positionClass} bg-white dark:bg-zinc-900 z-50 shadow-2xl
          transform transition-transform duration-300 ease-in-out ${slideClass}`}
      >
        {/* Drag region — important for Electron! */}
        <div className="h-8 w-full [-webkit-app-region:drag] bg-zinc-100 dark:bg-zinc-800" />

        <div className="p-6 overflow-y-auto h-full">{children}</div>
      </div>
    </>
  );
}

export default Drawer;
