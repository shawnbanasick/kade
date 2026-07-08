import LoadingsTable from './LoadingsTable/LoadingsTable';
import { useTranslation } from 'react-i18next';
import loadingState from '../GlobalState/loadingState';

const LoadingsTableTransitionContainer = () => {
  const { t } = useTranslation();
  const showLoadingsTable = loadingState((state) => state.showLoadingsTable);

  // loadings table is still class component, so this is a work around
  // to get proper re-rendering on language change
  const childTrans = {
    none: t('None'),
    colors: t('Colors'),
    gray: t('Gray'),
    autoflag: t('Auto-Flag'),
    all: t('All'),
    default: t('Default sort is by factor group'),
    fg: t('FG highest loading factor'),
    click: t('Click the column headers to resort'),
    send: t('Send Table Data to Output'),
    invert: t('Invert Factor'),
    split: t('Split Bipolar Factor'),
    at: t('at'),
    row: t('Row Highlighting'),
    flagging: t('Flagging'),
  };

  if (showLoadingsTable) {
    return (
      <div>
        <div className="text-4xl mb-6">{t('Factor Loadings')}</div>

        <LoadingsTable childTrans={childTrans} />
      </div>
    );
  }
  return <div className="h-37.5 mt-12.5 text-[22px]">{t('No factor loadings calculated')}</div>;
};

export default LoadingsTableTransitionContainer;
