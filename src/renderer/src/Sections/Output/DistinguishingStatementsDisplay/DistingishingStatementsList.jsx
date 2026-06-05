import React from 'react';
import DistStateListButtons from './DistStateListButtons';
import filterDistStateListData from './filterDistStateListData';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';
import DistinguishingTypeButtons from './DistinguishingTypeButtons';
import DistStateListCohensButton from './DistStateListCohensButton';
import calcCohensData from './calcCohensData';
import filterDistStateCohenListData from './filterDistStateCohenListData';
import CohensDynamicTable from './CohensDynamicTable';
import DistStateListSortByButtons from './DistStateListSortByButtons';
import DistStateListCohenSortByButtons from './DistStateListCohenSortByButtons';

const DistinguishingStatementsList = () => {
  const { t } = useTranslation();

  const sortKey = outputState((state) => state.distStateListSortKey);
  const threshold = outputState((state) => state.threshold);
  const sortCohensBy = outputState((state) => state.sortCohensBy);
  const displayData = filterDistStateListData(threshold, sortKey);
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
    consensusDisagreeArray
  );

  const displayCohenData = filterDistStateCohenListData(
    [...cohensData],
    cohensThreshold,
    userSelectedFactors,
    sortCohensBy
  );

  if (showFactorCorrelationsTable) {
    if (distIdentType === 'stephensonMethod') {
      return (
        <div className="pb-37.5 pr-5">
          <div className="mb-5 text-xl">
            {t('Interactive List')} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
            {t('Output thresholds are set in the Options section')}
          </div>
          <DistinguishingTypeButtons textSize="xl" className="mb-5" />
          <DistStateListSortByButtons />
          <DistStateListButtons />

          {displayData.map((factorItem, index1) => (
            <React.Fragment key={`key${index1.toString()}`}>
              <h2>{`${t('Factor')} ${factorItem.userSelectedFactor.slice(7)}`}</h2>
              <table className="border-collapse border border-black">
                <tbody>
                  <tr>
                    <th className="border border-black p-1.25">{t('Threshold')}</th>
                    <th className="border border-black p-1.25">{t('Z score')}</th>
                    <th className="border border-black p-1.25">{t('Q Sort Value')}</th>
                    <th className="border border-black p-1.25">{t('Number')}</th>
                    <th className="border border-black p-1.25">{t('Statement')}</th>
                  </tr>
                  {displayData[index1].distStates.map((item, index) => (
                    <tr
                      key={`key${index.toString()}`}
                      className={`hover:bg-[rgba(131,202,254,0.6)] ${index % 2 === 0 ? '' : 'bg-[#eee]'}`}
                    >
                      <td className="border border-black p-1.25">{item.sigLevelText}</td>
                      <td className="border border-black p-1.25 text-right">{item.zScore}</td>
                      <td className="border border-black p-1.25 text-center">{item.sortValue}</td>
                      <td className="border border-black p-1.25 text-center">{item.statement}</td>
                      <td className="border border-black p-1.25 min-w-150">{item.sortStatement}</td>
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
          <DistinguishingTypeButtons />
          <div className="mb-5 text-xl mt-5">
            {t('Interactive List')} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
            {t('Output thresholds are set in the Options section')}
          </div>
          <DistStateListCohenSortByButtons />
          <DistStateListCohensButton />
          {displayCohenData.map((factorItem, index) => (
            <React.Fragment key={`key${index.toString()}`}>
              <div className="text-2xl font-bold mt-4">{`${t('Factor')} ${factorItem.factorNumber}`}</div>
              <CohensDynamicTable factors={userSelectedFactors} data={factorItem.distStates} />
            </React.Fragment>
          ))}
        </div>
      );
    }
  }

  return <h2 className="mt-12.5 ml-12.5">{t('Select factors for output in the Options tab')}</h2>;
};

export default DistinguishingStatementsList;
