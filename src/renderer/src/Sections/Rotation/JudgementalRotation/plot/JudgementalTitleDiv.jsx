import styled from 'styled-components';
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
  const baselineData = transposeMatrix(factorMatrix);
  const notifyForSavedRotation = rotationState((state) => state.notifyForSavedRotation);
  if (notifyForSavedRotation) {
    toast.success(t('Rotation Data Saved to Loadings Table'), {
      autoClose: 5000,
    });
    rotationState.notifyForSavedRotation = false;
  }

  return (
    <JudgeTitleDiv id="outmostDiv">
      <FactorSelectionBar id="selectButton">
        <SelectLabel>{t('Select Factors')}</SelectLabel>
        <FactorSelectButtons baselineData={baselineData} />
        <ToastContainer transition={Zoom} />
      </FactorSelectionBar>
      <ScatterPlotAndTableTransitionContainer baselineData={baselineData} />
    </JudgeTitleDiv>
  );
};

export default JudgementalTitleDiv;

const JudgeTitleDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const FactorSelectionBar = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  font-size: 20px;
  height: 50px;
  width: 100%;
`;

const SelectLabel = styled.div`
  margin-right: 3px;
`;
