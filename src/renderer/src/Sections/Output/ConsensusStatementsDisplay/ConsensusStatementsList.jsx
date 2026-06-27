import { useMemo, useState, useEffect, useRef } from 'react';
import DistinguishingTypeButtons from '../DistinguishingStatementsDisplay/DistinguishingTypeButtons';
import DistStateListCohenSortByButtons from '../DistinguishingStatementsDisplay/DistStateListCohenSortByButtons';
import DistStateListCohensButton from '../DistinguishingStatementsDisplay/DistStateListCohensButton';
import calcConsensusData from './calcConsensusData';
import filterConsensusData from './filterConsensusData';
import calculateStephConsensusData from './calculateStephConsensusData';
import DistStateListButtons from '../DistinguishingStatementsDisplay/DistStateListButtons';
import DistStateListSortByButtons from '../DistinguishingStatementsDisplay/DistStateListSortByButtons';
import filterStephenConsensusData from './filterStephenConsensusData';
import ConStateListSortByButtons from './ConStateListSortByButtons';
import outputState from '../../GlobalState/outputState';
import calcState from '../../GlobalState/calcState';
import { useTranslation } from 'react-i18next';

const ConsensusStatementsList = () => {
  const { t } = useTranslation();
  const consensusDisagreeArray = outputState((state) => state.consensusDisagreeArray);
  const cohensThreshold = outputState((state) => state.cohensThreshold);
  const sortCohensBy = outputState((state) => state.sortCohensBy);
  const distIdentType = outputState((state) => state.distIdentType);
  const threshold = outputState((state) => state.threshold);
  const stephensonSortBy = outputState((state) => state.conStephensonSortBy);
  const displayOutputTabContent = outputState((state) => state.displayOutputTabContent);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [data1, setData1] = useState([]);

  const sortRows = (rows = [], keyMap) => {
    if (!sortConfig.key) return rows;
    return [...rows].sort((a, b) => {
      const aVal = a[keyMap[sortConfig.key]] ?? '';
      const bVal = b[keyMap[sortConfig.key]] ?? '';
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      const isNumeric = !isNaN(aNum) && !isNaN(bNum) && aVal !== '' && bVal !== '';
      const cmp = isNumeric ? aNum - bNum : String(aVal).localeCompare(String(bVal));
      return sortConfig.direction === 'asc' ? cmp : -cmp;
    });
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const SortIcon = ({ colKey }) => {
    if (sortConfig.key !== colKey) return <span style={{ opacity: 0.3, marginLeft: 4 }}>⇅</span>;
    return <span style={{ marginLeft: 4 }}>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
  };

  const thStyle = { cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' };

  const {
    cohens10,
    cohens20,
    cohens30,
    cohens40,
    cohens50,
    cohens60,
    cohens70,
    cohens80,
    cohens90,
    cohens100,
  } = outputState((state) => ({
    cohens10: state.cohens10,
    cohens20: state.cohens20,
    cohens30: state.cohens30,
    cohens40: state.cohens40,
    cohens50: state.cohens50,
    cohens60: state.cohens60,
    cohens70: state.cohens70,
    cohens80: state.cohens80,
    cohens90: state.cohens90,
    cohens100: state.cohens100,
  }));

  const {
    stephConsensus0001,
    stephConsensus0005,
    stephConsensus001,
    stephConsensus005,
    stephConsensus01,
    stephConsensus05,
    stephConsensus1,
    stephConsensus15,
    stephConsensus2,
  } = calcState((state) => ({
    stephConsensus0001: state.stephConsensus0001,
    stephConsensus0005: state.stephConsensus0005,
    stephConsensus001: state.stephConsensus001,
    stephConsensus005: state.stephConsensus005,
    stephConsensus01: state.stephConsensus01,
    stephConsensus05: state.stephConsensus05,
    stephConsensus1: state.stephConsensus1,
    stephConsensus15: state.stephConsensus15,
    stephConsensus2: state.stephConsensus2,
  }));

  const stephConsensusData = useMemo(
    () =>
      calculateStephConsensusData(
        [
          stephConsensus0001,
          stephConsensus0005,
          stephConsensus001,
          stephConsensus005,
          stephConsensus01,
          stephConsensus05,
          stephConsensus1,
          stephConsensus15,
          stephConsensus2,
        ],
        consensusDisagreeArray
      ),
    [
      stephConsensus0001,
      stephConsensus0005,
      stephConsensus001,
      stephConsensus005,
      stephConsensus01,
      stephConsensus05,
      stephConsensus1,
      stephConsensus15,
      stephConsensus2,
      consensusDisagreeArray,
    ]
  );

  // use stephConsensusData to create download data

  const stephData = useMemo(
    () => filterStephenConsensusData([...stephConsensusData], threshold, stephensonSortBy),
    [stephConsensusData, threshold, stephensonSortBy]
  );

  let excelExportData = [];
  if (stephData.excelExport) {
    excelExportData = JSON.parse(JSON.stringify(stephData.excelExport)); // deep copy to avoid mutating original data
  }

  useEffect(() => {
    setData1(stephData.returnList);
  }, [stephData]);

  const consensusData = useMemo(
    () =>
      calcConsensusData(
        {
          cohens10,
          cohens20,
          cohens30,
          cohens40,
          cohens50,
          cohens60,
          cohens70,
          cohens80,
          cohens90,
          cohens100,
        },
        consensusDisagreeArray
      ),
    [
      cohens10,
      cohens20,
      cohens30,
      cohens40,
      cohens50,
      cohens60,
      cohens70,
      cohens80,
      cohens90,
      cohens100,
      consensusDisagreeArray,
    ]
  );

  const cohenConsensusStatements = filterConsensusData(
    consensusData,
    cohensThreshold,
    sortCohensBy
  );

  const excelExportCohenData = JSON.parse(JSON.stringify(cohenConsensusStatements));

  const filteredCohenConsensusStatements = cohenConsensusStatements.filter(
    (item) => +item.cutoffLevel > 0 && +item.cutoffLevel <= +cohensThreshold
  );

  const thresholdLabel = t('Distinguishing Statements Threshold');

  const stephHeaders = [
    { label: t('Threshold'), key: 'threshold' },
    { label: t('Q Sort Values'), key: 'qValues' },
    { label: t('Statement Number'), key: 'stateNo' },
    { label: t('Statement'), key: 'statement' },
  ];
  const stephKeyMap = {
    threshold: 'highestLevel',
    qValues: 'qValues',
    stateNo: 'stateNo',
    statement: 'statement',
  };

  const sortedStephData = sortRows(data1, stephKeyMap);

  const cohensHeaders = [
    { label: t('Cohens d'), key: 'cutoffLevel' },
    { label: t('Q Sort Values'), key: 'qValues' },
    { label: t('Number'), key: 'statement' },
    { label: t('Statement'), key: 'sortStatement' },
  ];
  const cohensKeyMap = {
    cutoffLevel: 'cutoffLevel',
    qValues: 'qValues',
    statement: 'statement',
    sortStatement: 'sortStatement',
  };
  const sortedCohenConsensusStatements = sortRows(filteredCohenConsensusStatements, cohensKeyMap);

  if (!displayOutputTabContent) {
    return (
      <h2 className="mt-12.5 text-2xl ml-12.5">
        {t('Select factors for output in the Options tab')}
      </h2>
    );
  }

  if (distIdentType === 'stephensonMethod') {
    return (
      <div className="flex flex-col">
        <div className="mb-5 text-5xl">{t('Consensus Statements')}</div>
        <DistinguishingTypeButtons
          textSize="xl"
          className=""
          origin={'consensus'}
          exportData={excelExportData}
          cohenData={excelExportCohenData}
          cohensThreshold={cohensThreshold}
        />
        <DistStateListButtons label={thresholdLabel} />
        <>
          <table className="border-collapse border border-black mb-10 mr-5 mt-4">
            <thead>
              <tr>
                {stephHeaders.map(({ label, key }) => (
                  <th
                    key={key}
                    className="border border-black p-1.25"
                    onClick={() => handleSort(key)}
                    style={thStyle}
                  >
                    {label}
                    <SortIcon colKey={key} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedStephData.map((statement, index) => (
                <tr
                  key={`key${index}`}
                  className={`hover:bg-[rgba(131,202,254,0.6)] ${index % 2 === 0 ? '' : 'bg-[#eee]'}`}
                >
                  <td className="border border-black p-1.25 text-center w-30">{`P < ${statement.highestLevel}`}</td>
                  <td className="border border-black p-1.25 text-center w-50">
                    {statement.qValues}
                  </td>
                  <td className="border border-black p-1.25 text-center w-50">
                    {statement.stateNo}
                  </td>
                  <td className="border border-black p-1.25 text-left">{statement.statement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col">
        <div className="mb-5 text-5xl">{t('Consensus Statements')}</div>

        <DistinguishingTypeButtons
          textSize="xl"
          className=""
          origin={'consensus'}
          exportData={excelExportData}
          cohenData={excelExportCohenData}
          cohensThreshold={cohensThreshold}
        />
        <DistStateListCohensButton />
        <table className="border-collapse border border-black mt-4">
          <thead>
            <tr>
              {cohensHeaders.map(({ label, key }) => (
                <th
                  key={key}
                  className="border border-black p-1.25"
                  onClick={() => handleSort(key)}
                  style={thStyle}
                >
                  {label}
                  <SortIcon colKey={key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedCohenConsensusStatements.map((statement, index) => (
              <tr
                key={`key${index}`}
                className={`hover:bg-[rgba(131,202,254,0.6)] ${index % 2 === 0 ? '' : 'bg-[#eee]'}`}
              >
                <td className="border border-black p-1.25 text-center">{statement.cutoffLevel}</td>
                <td className="border border-black p-1.25 text-center">{statement.qValues}</td>
                <td className="border border-black p-1.25 text-center">{statement.statement}</td>
                <td className="border border-black p-1.25 min-w-150">{statement.sortStatement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ConsensusStatementsList;
