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
  const shouldShowJudgeRotDiv = rotationState((state) => state.shouldShowJudgeRotDiv);

  const notify = async () => {
    await updateNotifyForSavedRotation(false);
    await toast.success(t('Rotation Data Saved to Loadings Table'), { autoClose: 5000 });
  };

  const baselineData = transposeMatrix(factorMatrix);
  if (notifyForSavedRotation) {
    notify();
  }

  return (
    <>
      {shouldShowJudgeRotDiv ? (
        <div id="outmostDiv" className="w-full">
          <div
            id="selectButton"
            className="flex items-center justify-items-center text-[20px] h-10 w-full"
          >
            {/* <div className="w-[85px] text-[clamp(0.80rem,1.2cqw,2rem)]">{t('Factors')}:</div> */}
            <div className="w-21.25 text-[22px]">{t('Factors')}:</div>
            <FactorSelectButtons baselineData={baselineData} />
            <ToastContainer transition={Zoom} />
          </div>
          <ScatterPlotAndTableTransitionContainer baselineData={baselineData} />
        </div>
      ) : null}
    </>
  );
};

export default JudgementalTitleDiv;
