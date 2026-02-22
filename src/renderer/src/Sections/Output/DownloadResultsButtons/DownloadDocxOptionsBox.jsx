import { ToastContainer, Zoom } from 'react-toastify';
import DocxContentSelectionPanel from './DocxContentSelectionPanel';
import outputState from '../../GlobalState/outputState';

const OptionsBox = () => {
  const displayState = outputState((state) => state.showDocxOptions);

  return (
    <>
      <div className={`w-[500px]   h-[560px] mr-[50px]`}>
        {displayState && <DocxContentSelectionPanel />}
      </div>
      <ToastContainer transition={Zoom} />
    </>
  );
};

export default OptionsBox;
