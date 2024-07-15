import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import rotationState from '../../../GlobalState/rotationState';

const ParticipantPopUp = () => {
  const { t } = useTranslation();
  // getState
  const participantDataObject = rotationState((state) => state.participantDataObject);

  let respondent;
  let factor1Value;
  let factor2Value;
  if (participantDataObject !== false) {
    respondent = participantDataObject.respondent;
    factor1Value = participantDataObject.factor1;
    factor2Value = participantDataObject.factor2;
  }
  return (
    <div>
      {participantDataObject ? (
        <PopupDiv>
          <div>{respondent}</div>
          <div>{factor1Value},</div>
          <div>{factor2Value}</div>
        </PopupDiv>
      ) : (
        <PopupDiv>{t('Hover to view participant data')}</PopupDiv>
      )}
    </div>
  );
};

export default ParticipantPopUp;

const PopupDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: max-content;
  min-width: 250px;
  color: whitesmoke;
  background: black;
  border-radius: 4px;
  padding: 10px;
`;
