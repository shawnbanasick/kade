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
        <div className="section">
          <div className="outputFactorTables">
            <span className="outputFactorTablesSpan3">
              {t('Correlations between Factor Scores')}
            </span>
            <FactorCorrelationsTable />
          </div>
          <div className="outputFactorTables">
            <span className="outputFactorTablesSpan3">{t('Factor Characteristics')}</span>
            <FactorCharacteristicsTable />
          </div>
          <div className="outputFactorTables">
            <span className="outputFactorTablesSpan3">
              {t('Standard Errors for Differences in Factor Z scores')}
            </span>
            <span className="outputFactorTablesSpan2">
              {t('Diagonal Entries Are S E Within Factors')}
            </span>
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
