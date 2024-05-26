import React from 'react';

import { Transition } from 'semantic-ui-react';
import FactorCorrelationsTable from './Factor Info/FactorCorrelationsTable';
import FactorCharacteristicsTable from './Factor Info/FactorCharacteristicsTable';
import StandardErrorsDifferencesTable from './Factor Info/StandardErrorsDifferencesTable';
import { useTranslation } from 'react-i18next';
import getOutputState from '../GlobalState/getOutputState';

// import './OutputFactorTablesTransitionContainer.css';

const OutputFactorTablesTranstionContainer = () => {
  const { t } = useTranslation();

  const showFactorCorrelationsTable = getOutputState('showFactorCorrelationsTable');

  if (showFactorCorrelationsTable) {
    return (
      <Transition visible={showFactorCorrelationsTable} animation="fade" duration={1000}>
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
      </Transition>
    );
  }
  return (
    <h2 style={{ marginTop: 50, marginLeft: 50 }}>
      {t('Select factors for output in the Options tab')}
    </h2>
  );
};

export default OutputFactorTablesTranstionContainer;

/*
.outputFactorTables {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
}

.outputFactorTablesSpan2 {
    text-align: left; 
    margin-bottom: 5px;
    font-size: 16px;
    line-height: 18px;
}

.outputFactorTablesSpan3 {
    text-align: left;
    font-size: 26px;
    margin-bottom: 5px;
}
*/
