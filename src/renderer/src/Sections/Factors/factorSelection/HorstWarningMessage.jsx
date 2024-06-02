import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import factorState from '../../GlobalState/factorState';

const HorstWarningMessage = () => {
  const { t } = useTranslation();
  const showHorstWarningMessage = factorState((state) => state.didNotConverge);
  const horstIterations = factorState((state) => state.horstIterations);

  if (showHorstWarningMessage) {
    return (
      <HorstNoConvergenceMessage>
        {`${t('No convergence')}: ${horstIterations} ${t('iterations')}`}
      </HorstNoConvergenceMessage>
    );
  } else {
    return null;
  }
};

export default HorstWarningMessage;

const HorstNoConvergenceMessage = styled.div`
  margin-bottom: 50px;
  font-size: 20px;
  background: #ffff00;
  min-width: 300px;
  padding: 3px 20px 3px 20px;
  width: max-content;
  border: 2px solid black;
`;
