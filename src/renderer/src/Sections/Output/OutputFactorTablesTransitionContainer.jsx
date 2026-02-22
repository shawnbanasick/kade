import FactorCorrelationsTable from './Factor Info/FactorCorrelationsTable';
import FactorCharacteristicsTable from './Factor Info/FactorCharacteristicsTable';
import StandardErrorsDifferencesTable from './Factor Info/StandardErrorsDifferencesTable';
import { useTranslation } from 'react-i18next';
import outputState from '../GlobalState/outputState';

const OutputFactorTablesTransitionContainer = () => {
  const { t } = useTranslation();
  const showFactorCorrelationsTable = outputState((state) => state.showFactorCorrelationsTable);

  if (showFactorCorrelationsTable) {
    return (
      <div className={`${showFactorCorrelationsTable ? 'visible' : 'hidden'}`}>
        <div className="">
          <div className="mb-[30px]">
            <span className="text-2xl">{t('Correlations between Factor Scores')}</span>
            <FactorCorrelationsTable />
          </div>
          <div className="mb-[30px]">
            <span className="text-2xl">{t('Factor Characteristics')}</span>
            <FactorCharacteristicsTable />
          </div>
          <div className="flex flex-col gap-1 mb-[30px]">
            <span className="text-2xl">
              {t('Standard Errors for Differences in Factor Z scores')}
            </span>
            <span className="">{t('Diagonal Entries Are S E Within Factors')}</span>
            <StandardErrorsDifferencesTable />
          </div>
        </div>
      </div>
    );
  }
  return (
    <h2 className="mt-[50px] ml-[50px]!">{t('Select factors for output in the Options tab')}</h2>
  );
};

export default OutputFactorTablesTransitionContainer;
