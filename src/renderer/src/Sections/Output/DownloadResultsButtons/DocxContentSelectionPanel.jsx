import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import React from 'react';
import DocSelectionSwitch from '../downloadDocxLogic/DocSelectionSwitch';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';
import DocxNumberInput from './DocxNumberInput';

const styles = {
  fontSize: 22,
  userSelect: 'none'
};

const GeneralOptionsPanel = () => {
  const { t } = useTranslation();
  let facCharText = t('Factor Characteristics / Standard Errors');

  return (
    <React.Fragment>
      <span style={styles}>{t('Document Content')}</span>
      <hr style={{ width: '100%', marginBottom: 15 }} />

      <OptionStatementRow>
        <OptionStatementText>{`1. ${t('Overview')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeOverview"
          value="willIncludeOverview"
          toggle={outputState.willIncludeOverview}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`2. ${t('Statements')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeStatements"
          value="willIncludeStatements"
          toggle={outputState.willIncludeStatements}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`3. ${t('Q sorts')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeQsorts"
          value="willIncludeQsorts"
          toggle={outputState.willIncludeQsorts}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`4. ${t('Q Sort Correlations')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeCorrMatrix"
          value="willIncludeCorrMatrix"
          toggle={outputState.willIncludeCorrMatrix}
        />
        <br />
        <OptionStatementText>{`${t('Highlight')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeThreshold"
          value="willIncludeThreshold"
          toggle={outputState.willIncludeThreshold}
        />
        <OptionStatementText>{`${t('Value')}: `}</OptionStatementText>
        <DocxNumberInput
          name={'correlationThreshold'}
          step="1"
          lowerLimit={0}
          upperLimit={100.0}
          value={40}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`5. ${t('Unrotated Factor Matrix')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeUnrotFacMatrix"
          value="willIncludeUnrotFacMatrix"
          toggle={outputState.willIncludeUnrotFacMatrix}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`6. ${t('Cumulative Communalities')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeCumulComm"
          value="willIncludeCumulComm"
          toggle={outputState.willIncludeCumulComm}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`7. ${t('Factor Loadings')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFacLoadings"
          value="willIncludeFacLoadings"
          toggle={outputState.willIncludeFacLoadings}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`8. ${t('Factor Loadings Table')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFacLoadingsTable"
          value="willIncludeFacLoadingsTable"
          toggle={outputState.willIncludeFacLoadingsTable}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`9. ${t('Free Distribution')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFreeDist"
          value="willIncludeFreeDist"
          toggle={outputState.willIncludeFreeDist}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`10. ${t('Factor Score Ranks')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFacScoreRanks"
          value="willIncludeFacScoreRanks"
          toggle={outputState.willIncludeFacScoreRanks}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`11. ${t('Factor Score Correlations')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFacScoreCorr"
          value="willIncludeFacScoreCorr"
          toggle={outputState.willIncludeFacScoreCorr}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`12. ${t('Factors')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFactors"
          value="willIncludeFactors"
          toggle={outputState.willIncludeFactors}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`13. ${t('Factor Differences')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFacDiffs"
          value="willIncludeFacDiffs"
          toggle={outputState.willIncludeFacDiffs}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`14. ${t('Consensus-Disagreement')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeConDis"
          value="willIncludeConDis"
          toggle={outputState.willIncludeConDis}
        />
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`15. ${facCharText}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFacChar"
          value="willIncludeFacChar"
          toggle={outputState.willIncludeFacChar}
        />
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`16. ${t('Distinguishing Statements')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeDist"
          value="willIncludeDist"
          toggle={outputState.willIncludeDist}
        />
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`17. ${t('Consensus Statements')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeConsensus"
          value="willIncludeConsensus"
          toggle={outputState.willIncludeConsensus}
        />
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`18. ${t('Relative Ranks')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeRelRanks"
          value="willIncludeRelRanks"
          toggle={outputState.willIncludeRelRanks}
        />
      </OptionStatementRow>
    </React.Fragment>
  );
};

export default view(GeneralOptionsPanel);

const OptionStatementRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-left: 10px;
  // outline: 2px solid red;
`;

const OptionStatementText = styled.div`
  user-select: none;
  font-size: 16px;
  width: auto;
`;
