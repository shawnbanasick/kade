import { ToastContainer, Zoom } from 'react-toastify';
import DocxContentSelectionPanel from './DocxContentSelectionPanel';
import outputState from '../../GlobalState/outputState';

const OptionsBox = () => {
  const displayState = outputState((state) => state.showDocxOptions);

  return (
    <>
      <div
        className={`
          w-[500px] h-[550px] box-border overflow-auto mb-[150px] mr-[50px]
          transition-[visibility] duration-500 linear
          [&_.ui.attached.tabular.menu]:bg-grey-button [&_.ui.attached.tabular.menu]:h-[45px]
          [&_.ui.bottom.attached.segment.active.tab]:border-b-white [&_.ui.bottom.attached.segment.active.tab]:border-l-white
          ${displayState ? 'visible animate-fadeIn' : 'invisible animate-fadeOut'}
        `}
      >
        {displayState && <DocxContentSelectionPanel />}
      </div>
      <ToastContainer transition={Zoom} />
    </>
  );
};

export default OptionsBox;
