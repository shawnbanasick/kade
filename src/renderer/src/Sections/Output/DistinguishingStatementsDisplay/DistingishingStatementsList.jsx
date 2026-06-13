import React, { useMemo, useState } from 'react';
import DistStateListButtons from './DistStateListButtons';
import filterDistStateListData from './filterDistStateListData';
import { useTranslation } from 'react-i18next';
import DistinguishingTypeButtons from './DistinguishingTypeButtons';
import DistStateListCohensButton from './DistStateListCohensButton';
import calcCohensData from './calcCohensData';
import filterDistStateCohenListData from './filterDistStateCohenListData';
import CohensDynamicTable from './CohensDynamicTable';
import DistStateListSortByButtons from './DistStateListSortByButtons';
import DistStateListCohenSortByButtons from './DistStateListCohenSortByButtons';
import outputState from '../../GlobalState/outputState';
import calcState from '../../GlobalState/calcState';

const DistinguishingStatementsList = () => {
  const { t } = useTranslation();

  const sortKey = outputState((state) => state.distStateListSortKey);
  const threshold = outputState((state) => state.threshold);
  const sortCohensBy = outputState((state) => state.sortCohensBy);
  const showFactorCorrelationsTable = outputState((state) => state.showFactorCorrelationsTable);
  const distIdentType = outputState((state) => state.distIdentType);
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
  const consensusDisagreeArray = outputState((state) => state.consensusDisagreeArray);
  const userSelectedFactors = outputState((state) => state.userSelectedFactors);
  const cohensThreshold = outputState((state) => state.cohensThreshold);
  const distStateListData = calcState((state) => state.distStateListData);

  const displayData = useMemo(() => {
    return filterDistStateListData(threshold, sortKey, distStateListData, userSelectedFactors);
  }, [threshold, sortKey, distStateListData, userSelectedFactors]);

  const cohensData = calcCohensData(
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
    consensusDisagreeArray,
    userSelectedFactors
  );

  const displayCohenData = useMemo(() => {
    return filterDistStateCohenListData(
      [...cohensData],
      cohensThreshold,
      userSelectedFactors,
      sortCohensBy
    );
  }, [cohensData, cohensThreshold, userSelectedFactors, sortCohensBy]);

  const thresholdLabel = t('Threshold');

  const [sortConfigs, setSortConfigs] = useState({});

  const handleSort = (factorIndex, key) => {
    setSortConfigs((prev) => ({
      ...prev,
      [factorIndex]: {
        key,
        direction:
          prev[factorIndex]?.key === key && prev[factorIndex]?.direction === 'asc' ? 'desc' : 'asc',
      },
    }));
  };

  const getSortedRows = (rows, factorIndex) => {
    const config = sortConfigs[factorIndex];
    if (!config?.key) return rows;
    return [...rows].sort((a, b) => {
      const aVal = a[config.key] ?? '';
      const bVal = b[config.key] ?? '';
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      const isNumeric = !isNaN(aNum) && !isNaN(bNum) && aVal !== '' && bVal !== '';
      const cmp = isNumeric ? aNum - bNum : String(aVal).localeCompare(String(bVal));
      return config.direction === 'asc' ? cmp : -cmp;
    });
  };

  const SortIcon = ({ factorIndex, colKey }) => {
    const config = sortConfigs[factorIndex];
    if (config?.key !== colKey) return <span style={{ opacity: 0.3, marginLeft: 4 }}>⇅</span>;
    return <span style={{ marginLeft: 4 }}>{config.direction === 'asc' ? '↑' : '↓'}</span>;
  };

  if (showFactorCorrelationsTable) {
    if (distIdentType === 'stephensonMethod') {
      return (
        <div className="mb-37.5 pr-5">
          <div className="mb-5 text-5xl">{t('Distinguishing Statements')}</div>
          <DistinguishingTypeButtons textSize="xl" className="mb-5" origin={'distinguishing'} />
          {/* <DistStateListSortByButtons /> */}
          <DistStateListButtons label={thresholdLabel} />

          {displayData.map((factorItem, index1) => (
            <React.Fragment key={`key${index1.toString()}`}>
              <div className="text-2xl font-bold mt-6">{`${t('Factor')} ${factorItem.userSelectedFactor.slice(7)}`}</div>
              <table className="border-collapse border border-black">
                <thead>
                  <tr>
                    {[
                      { label: t('Threshold'), key: 'sigLevelText' },
                      { label: t('Z score'), key: 'zScore' },
                      { label: t('Q Sort Value'), key: 'sortValue' },
                      { label: t('Number'), key: 'statement' },
                      { label: t('Statement'), key: 'sortStatement' },
                    ].map(({ label, key }) => (
                      <th
                        key={key}
                        className="border border-black p-1.25"
                        onClick={() => handleSort(index1, key)}
                        style={{ cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}
                      >
                        {label}
                        <SortIcon factorIndex={index1} colKey={key} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getSortedRows(displayData[index1].distStates, index1).map((item, index) => (
                    <tr
                      key={`key${index.toString()}`}
                      className={`hover:bg-[rgba(131,202,254,0.6)] ${index % 2 === 0 ? '' : 'bg-[#eee]'}`}
                    >
                      <td className="border border-black p-1.25 min-w-25 text-center">
                        {item.sigLevelText}
                      </td>
                      <td className="border border-black p-1.25 min-w-20 text-center">
                        {item.zScore}
                      </td>
                      <td className="border border-black p-1.25 text-center min-w-36">
                        {item.sortValue}
                      </td>
                      <td className="border border-black p-1.25 text-center min-w-25">
                        {item.statement}
                      </td>
                      <td className="border border-black p-1.25 w-full">{item.sortStatement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </React.Fragment>
          ))}
        </div>
      );
    } else if (distIdentType === 'cohenMethod') {
      return (
        <div className="pb-37.5 pr-5">
          <div className="mb-5 text-5xl">{t('Distinguishing Statements')}</div>
          <DistinguishingTypeButtons textSize="xl" className="mb-6" origin={'distinguishing'} />
          {/* <DistStateListCohenSortByButtons /> */}
          <DistStateListCohensButton />
          {displayCohenData.map((factorItem, index) => (
            <React.Fragment key={`key${index.toString()}`}>
              <div className="text-2xl font-bold mt-4">{`${t('Factor')} ${factorItem.factor}`}</div>
              <CohensDynamicTable
                factor={factorItem.factorNumber}
                factors={userSelectedFactors}
                data={factorItem.distStates}
              />
            </React.Fragment>
          ))}
        </div>
      );
    }
  }

  return <h2 className="mt-12.5 ml-12.5">{t('Select factors for output in the Options tab')}</h2>;
};

export default DistinguishingStatementsList;
