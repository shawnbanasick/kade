import downloadDistStates from './downloadDistStates';
import outputState from '../../GlobalState/outputState';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import CsvIcon from '../../images/CSV_Icon2.svg';

const DistStateListCohenSortByButtons = () => {
  const { t } = useTranslation();
  const cohenSortByCohensButtonActive = outputState((state) => state.cohenSortByCohensButtonActive);
  const cohenSortBySortValueButtonActive = outputState(
    (state) => state.cohenSortBySortValueButtonActive
  );
  const cohenSortByStatementNumButtonActive = outputState(
    (state) => state.cohenSortByStatementNumButtonActive
  );
  const updateCohenSortByCohensButtonActive = outputState(
    (state) => state.updateCohenSortByCohensButtonActive
  );
  const updateCohenSortBySortValueButtonActive = outputState(
    (state) => state.updateCohenSortBySortValueButtonActive
  );
  const updateCohenSortByStatementNumButtonActive = outputState(
    (state) => state.updateCohenSortByStatementNumButtonActive
  );
  const updateSortCohensBy = outputState((state) => state.updateSortCohensBy);

  const clearAllButtons = () => {
    updateCohenSortByCohensButtonActive(false);
    updateCohenSortBySortValueButtonActive(false);
    updateCohenSortByStatementNumButtonActive(false);
  };

  const handleOnclick = (event) => {
    const buttonId = event.target.id;

    if (buttonId === 'cohenDButton') {
      clearAllButtons();
      updateCohenSortByCohensButtonActive(true);
      updateSortCohensBy('cohenLevel');
    }
    if (buttonId === 'cohenSortBySortValueButton') {
      clearAllButtons();
      updateCohenSortBySortValueButtonActive(true);
      updateSortCohensBy('sortValue');
    }
    if (buttonId === 'statementNumButton') {
      clearAllButtons();
      updateCohenSortByStatementNumButtonActive(true);
      updateSortCohensBy('statementNum');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="mr-2.5 text-[18px] font-bold">{t('Sort By')}</div>
      <GeneralButton
        id="cohenDButton"
        onClick={() => handleOnclick({ target: { id: 'cohenDButton' } })}
        key="f1"
        className={`min-w-30 ${cohenSortByCohensButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      >
        <div>
          {t('cohens')} <i>d</i>
        </div>
      </GeneralButton>
      <GeneralButton
        id="cohenSortBySortValueButton"
        onClick={() => handleOnclick({ target: { id: 'cohenSortBySortValueButton' } })}
        key="f2"
        className={`min-w-30 ${cohenSortBySortValueButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      >
        {t('QSortValue')}
      </GeneralButton>
      <GeneralButton
        id="statementNumButton"
        onClick={() => handleOnclick({ target: { id: 'statementNumButton' } })}
        key="f3"
        className={`min-w-30 ${cohenSortByStatementNumButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      >
        {t('StatementNumber')}
      </GeneralButton>
    </div>
  );
};

export default DistStateListCohenSortByButtons;
