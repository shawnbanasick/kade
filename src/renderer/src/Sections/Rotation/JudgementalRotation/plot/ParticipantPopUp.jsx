import { useTranslation } from 'react-i18next';
import rotationState from '../../../GlobalState/rotationState';
import evenRound from '../../../../Utils/evenRound';

const ParticipantPopUp = () => {
  const { t } = useTranslation();
  // getState
  const participantDataObject = rotationState((state) => state.participantDataObject);

  let respondent;
  let factor1Value;
  let factor2Value;
  if (participantDataObject !== false) {
    respondent = participantDataObject.respondent;
    factor1Value = evenRound(participantDataObject.factor1, 2);
    factor2Value = evenRound(participantDataObject.factor2, 2);
  }
  return (
    <div className="mt-2">
      {participantDataObject ? (
        <div className="flex flex-row justify-around w-max min-w-[250px] text-white bg-gray-800 rounded-md p-2">
          <div>{respondent}</div>
          <div>{factor1Value},</div>
          <div>{factor2Value}</div>
        </div>
      ) : (
        <div className="flex flex-row justify-around w-max min-w-[290px] text-black bg-gray-300 rounded-md p-2">
          {t('Hover over circle to view participant data')}
        </div>
      )}
    </div>
  );
};

export default ParticipantPopUp;
