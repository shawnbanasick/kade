import React from 'react';
import DistStateListButtons from './DistStateListButtons';
import filterDistStateListData from './filterDistStateListData';
import DistStateListSortByButtons from './DistStateListSortByButtons';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';

const DistinguishingStatementsList = () => {
  const { t } = useTranslation();

  const sortKey = outputState((state) => state.distStateListSortKey);
  const threshold = outputState((state) => state.threshold);
  const displayData = filterDistStateListData(threshold, sortKey);
  const showFactorCorrelationsTable = outputState((state) => state.showFactorCorrelationsTable);

  if (showFactorCorrelationsTable) {
    return (
      <div className="pb-[150px] pr-[20px]">
        <h2>
          {t('Interactive List')} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
          {t('Output thresholds are set in the Options section')}
        </h2>
        <DistStateListSortByButtons />
        <DistStateListButtons />

        {displayData.map((factorItem, index1) => (
          <React.Fragment key={`key${index1.toString()}`}>
            <h2>{`${t('Factor')} ${factorItem.userSelectedFactor.slice(7)}`}</h2>
            <table className="border-collapse border border-black">
              <tbody>
                <tr>
                  <th className="border border-black p-[5px]">{t('Threshold')}</th>
                  <th className="border border-black p-[5px]">{t('Z score')}</th>
                  <th className="border border-black p-[5px]">{t('Q Sort Value')}</th>
                  <th className="border border-black p-[5px]">{t('Number')}</th>
                  <th className="border border-black p-[5px]">{t('Statement')}</th>
                </tr>
                {displayData[index1].distStates.map((item, index) => (
                  <tr
                    key={`key${index.toString()}`}
                    className={`hover:bg-[rgba(131,202,254,0.6)] ${index % 2 === 0 ? '' : 'bg-[#eee]'}`}
                  >
                    <td className="border border-black p-[5px]">{item.sigLevelText}</td>
                    <td className="border border-black p-[5px] text-right">{item.zScore}</td>
                    <td className="border border-black p-[5px] text-center">{item.sortValue}</td>
                    <td className="border border-black p-[5px] text-center">{item.statement}</td>
                    <td className="border border-black p-[5px] min-w-[600px]">
                      {item.sortStatement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <h2 className="mt-[50px] ml-[50px]">{t('Select factors for output in the Options tab')}</h2>
  );
};

export default DistinguishingStatementsList;
