import React from 'react';
import DocSelectionSwitch from '../downloadDocxLogic/DocSelectionSwitch';
import { useTranslation } from 'react-i18next';
import DocxNumberInput from './DocxNumberInput';
import outputState from '../../GlobalState/outputState';

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

  const rows = [
    { label: `1. ${t('Overview')}`, name: 'willIncludeOverview', toggle: willIncludeOverview },
    {
      label: `2. ${t('Statements')}`,
      name: 'willIncludeStatements',
      toggle: willIncludeStatements,
    },
    { label: `3. ${t('Q sorts')}`, name: 'willIncludeQsorts', toggle: willIncludeQsorts },
    {
      label: `5. ${t('Unrotated Factor Matrix')}`,
      name: 'willIncludeUnrotFacMatrix',
      toggle: willIncludeUnrotFacMatrix,
    },
    {
      label: `6. ${t('Cumulative Communalities')}`,
      name: 'willIncludeCumulComm',
      toggle: willIncludeCumulComm,
    },
    {
      label: `7. ${t('Factor Loadings')}`,
      name: 'willIncludeFacLoadings',
      toggle: willIncludeFacLoadings,
    },
    {
      label: `8. ${t('Factor Loadings Table')}`,
      name: 'willIncludeFacLoadingsTable',
      toggle: willIncludeFacLoadingsTable,
    },
    {
      label: `9. ${t('Free Distribution')}`,
      name: 'willIncludeFreeDist',
      toggle: willIncludeFreeDist,
    },
    {
      label: `10. ${t('Factor Score Ranks')}`,
      name: 'willIncludeFacScoreRanks',
      toggle: willIncludeFacScoreRanks,
    },
    {
      label: `11. ${t('Factor Score Correlations')}`,
      name: 'willIncludeFacScoreCorr',
      toggle: willIncludeFacScoreCorr,
    },
    { label: `12. ${t('Factors')}`, name: 'willIncludeFactors', toggle: willIncludeFactors },
    {
      label: `13. ${t('Factor Differences')}`,
      name: 'willIncludeFacDiffs',
      toggle: willIncludeFacDiffs,
    },
    {
      label: `14. ${t('Consensus-Disagreement')}`,
      name: 'willIncludeConDis',
      toggle: willIncludeConDis,
    },
    { label: `15. ${facCharText}`, name: 'willIncludeFacChar', toggle: willIncludeFacChar },
    {
      label: `16. ${t('Distinguishing Statements')}`,
      name: 'willIncludeDist',
      toggle: willIncludeDist,
    },
    {
      label: `17. ${t('Consensus Statements')}`,
      name: 'willIncludeConsensus',
      toggle: willIncludeConsensus,
    },
    {
      label: `18. ${t('Relative Ranks')}`,
      name: 'willIncludeRelRanks',
      toggle: willIncludeRelRanks,
    },
  ];

  return (
    <React.Fragment>
      <span className="text-[22px] select-none">{t('Document Content')}</span>
      <hr className="w-full mb-[15px]" />

      {/* Row 4 (Q Sort Correlations) is kept separate due to its extra controls */}
      {rows.slice(0, 3).map(({ label, name, toggle }) => (
        <div key={name} className="flex flex-row items-center w-full pl-[10px]">
          <div className="select-none text-[18px] w-auto">{label}</div>
          <DocSelectionSwitch name={name} value={name} toggle={toggle} />
        </div>
      ))}

      <div className="flex flex-row items-center w-full pl-[10px]">
        <div className="select-none text-[18px] w-auto">{`4. ${t('Q Sort Correlations')}`}</div>
        <DocSelectionSwitch
          name="willIncludeCorrMatrix"
          value="willIncludeCorrMatrix"
          toggle={willIncludeCorrMatrix}
        />
        <br />
        <div className="select-none text-[18px] w-auto">{t('Highlight')}</div>
        <DocSelectionSwitch
          name="willIncludeThreshold"
          value="willIncludeThreshold"
          toggle={willIncludeThreshold}
        />
        <div className="select-none text-[18px] w-auto">{`${t('Value')}: `}</div>
        <DocxNumberInput
          name="correlationThreshold"
          step="1"
          lowerLimit={0}
          upperLimit={100.0}
          value={40}
        />
      </div>

      {rows.slice(3).map(({ label, name, toggle }) => (
        <div key={name} className="flex flex-row items-center w-full pl-[10px]">
          <div className="select-none text-[18px] w-auto">{label}</div>
          <DocSelectionSwitch name={name} value={name} toggle={toggle} />
        </div>
      ))}
    </React.Fragment>
  );
};

export default GeneralOptionsPanel;
