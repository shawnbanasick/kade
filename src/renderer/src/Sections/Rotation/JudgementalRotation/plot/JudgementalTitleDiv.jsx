import { ToastContainer, toast, Zoom } from 'react-toastify';
import transposeMatrix from '../../../../Utils/transposeMatrix';
import FactorSelectButtons from '../FactorSelect/FactorSelectButtons';
import ScatterPlotAndTableTransitionContainer from './ScatterPlotAndTableTransitionContainer';
import { useTranslation } from 'react-i18next';
import rotationState from '../../../GlobalState/rotationState';
import factorState from '../../../GlobalState/factorState';

const JudgementalTitleDiv = () => {
  const { t } = useTranslation();
  const factorMatrix = factorState((state) => state.factorMatrix);
  const notifyForSavedRotation = rotationState((state) => state.notifyForSavedRotation);
  const updateNotifyForSavedRotation = rotationState((state) => state.updateNotifyForSavedRotation);

  const notify = async () => {
    await updateNotifyForSavedRotation(false);
    await toast.success(t('Rotation Data Saved to Loadings Table'), { autoClose: 5000 });
  };

  const baselineData = transposeMatrix(factorMatrix);
  if (notifyForSavedRotation) {
    notify();
  }

  return (
    <div id="outmostDiv" className="w-full h-full">
      <div
        id="selectButton"
        className="flex items-center justify-items-center text-[20px] h-[50px] w-full"
      >
        <div className="mr-[3px] text-[clamp(0.80rem,1.2cqw,2rem)]">{t('Select Factors')}</div>
        <FactorSelectButtons baselineData={baselineData} />
        <ToastContainer transition={Zoom} />
      </div>
      <ScatterPlotAndTableTransitionContainer baselineData={baselineData} />
    </div>
  );
};

export default JudgementalTitleDiv;
