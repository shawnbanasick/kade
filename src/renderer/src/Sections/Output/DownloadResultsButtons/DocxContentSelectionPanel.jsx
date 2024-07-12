import React from 'react';
import styled from 'styled-components';
import DocSelectionSwitch from '../downloadDocxLogic/DocSelectionSwitch';
import { useTranslation } from 'react-i18next';
import DocxNumberInput from './DocxNumberInput';
import outputState from '../../GlobalState/outputState';

const styles = {
  fontSize: 22,
  userSelect: 'none',
};

const GeneralOptionsPanel = () => {
  const { t } = useTranslation();
  let facCharText = t('Factor Characteristics / Standard Errors');
  const willIncludeOverview = outputState((state) => state.willIncludeOverview);
  const willIncludeStatements = outputState((state) => state.willIncludeStatements);
  const willIncludeQsorts = outputState((state) => state.willIncludeQsorts);
  const willIncludeCorrMatrix = outputState((state) => state.willIncludeCorrMatrix);
  const willIncludeThreshold = outputState((state) => state.willIncludeThreshold);
  const willIncludeUnrotFacMatrix = outputState((state) => state.willIncludeUnrotFacMatrix);
  const willIncludeCumulComm = outputState((state) => state.willIncludeCumulComm);
  const willIncludeFacLoadings = outputState((state) => state.willIncludeFacLoadings);
  const willIncludeFacLoadingsTable = outputState((state) => state.willIncludeFacLoadingsTable);
  const willIncludeFreeDist = outputState((state) => state.willIncludeFreeDist);
  const willIncludeFacScoreRanks = outputState((state) => state.willIncludeFacScoreRanks);
  const willIncludeFacScoreCorr = outputState((state) => state.willIncludeFacScoreCorr);
  const willIncludeFactors = outputState((state) => state.willIncludeFactors);
  const willIncludeFacDiffs = outputState((state) => state.willIncludeFacDiffs);
  const willIncludeConDis = outputState((state) => state.willIncludeConDis);
  const willIncludeFacChar = outputState((state) => state.willIncludeFacChar);
  const willIncludeDist = outputState((state) => state.willIncludeDist);
  const willIncludeConsensus = outputState((state) => state.willIncludeConsensus);
  const willIncludeRelRanks = outputState((state) => state.willIncludeRelRanks);

  return (
    <React.Fragment>
      <span style={styles}>{t('Document Content')}</span>
      <hr style={{ width: '100%', marginBottom: 15 }} />

      <OptionStatementRow>
        <OptionStatementText>{`1. ${t('Overview')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeOverview"
          value="willIncludeOverview"
          toggle={willIncludeOverview}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`2. ${t('Statements')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeStatements"
          value="willIncludeStatements"
          toggle={willIncludeStatements}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`3. ${t('Q sorts')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeQsorts"
          value="willIncludeQsorts"
          toggle={willIncludeQsorts}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`4. ${t('Q Sort Correlations')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeCorrMatrix"
          value="willIncludeCorrMatrix"
          toggle={willIncludeCorrMatrix}
        />
        <br />
        <OptionStatementText>{`${t('Highlight')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeThreshold"
          value="willIncludeThreshold"
          toggle={willIncludeThreshold}
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
          toggle={willIncludeUnrotFacMatrix}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`6. ${t('Cumulative Communalities')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeCumulComm"
          value="willIncludeCumulComm"
          toggle={willIncludeCumulComm}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`7. ${t('Factor Loadings')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFacLoadings"
          value="willIncludeFacLoadings"
          toggle={willIncludeFacLoadings}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`8. ${t('Factor Loadings Table')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFacLoadingsTable"
          value="willIncludeFacLoadingsTable"
          toggle={willIncludeFacLoadingsTable}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`9. ${t('Free Distribution')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFreeDist"
          value="willIncludeFreeDist"
          toggle={willIncludeFreeDist}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`10. ${t('Factor Score Ranks')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFacScoreRanks"
          value="willIncludeFacScoreRanks"
          toggle={willIncludeFacScoreRanks}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`11. ${t('Factor Score Correlations')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFacScoreCorr"
          value="willIncludeFacScoreCorr"
          toggle={willIncludeFacScoreCorr}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`12. ${t('Factors')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFactors"
          value="willIncludeFactors"
          toggle={willIncludeFactors}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`13. ${t('Factor Differences')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFacDiffs"
          value="willIncludeFacDiffs"
          toggle={willIncludeFacDiffs}
        />
      </OptionStatementRow>

      <OptionStatementRow>
        <OptionStatementText>{`14. ${t('Consensus-Disagreement')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeConDis"
          value="willIncludeConDis"
          toggle={willIncludeConDis}
        />
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`15. ${facCharText}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeFacChar"
          value="willIncludeFacChar"
          toggle={willIncludeFacChar}
        />
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`16. ${t('Distinguishing Statements')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeDist"
          value="willIncludeDist"
          toggle={willIncludeDist}
        />
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`17. ${t('Consensus Statements')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeConsensus"
          value="willIncludeConsensus"
          toggle={willIncludeConsensus}
        />
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`18. ${t('Relative Ranks')}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeRelRanks"
          value="willIncludeRelRanks"
          toggle={willIncludeRelRanks}
        />
      </OptionStatementRow>
    </React.Fragment>
  );
};

export default GeneralOptionsPanel;

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
