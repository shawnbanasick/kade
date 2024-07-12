import React from 'react';

import styled from 'styled-components';
import DistStateListButtons from './DistStateListButtons';
import filterDistStateListData from './filterDistStateListData';
import DistStateListSortByButtons from './DistStateListSortByButtons';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';

// todo - need to calculate dynamic height here for styles

const DistinguishingStatementsList = () => {
  const { t } = useTranslation();

  // getState
  const sortKey = outputState((state) => state.distStateListSortKey);
  const threshold = outputState((state) => state.threshold);
  const displayData = filterDistStateListData(threshold, sortKey);
  const showFactorCorrelationsTable = outputState((state) => state.showFactorCorrelationsTable);

  if (showFactorCorrelationsTable) {
    return (
      <Container1>
        <h2>
          {t('Interactive List')} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
          {t('Output thresholds are set in the Options section')}
        </h2>
        <DistStateListSortByButtons />
        <DistStateListButtons />

        {displayData.map((factorItem, index1) => (
          <React.Fragment key={`key${index1.toString()}`}>
            <h2>{`${t('Factor')} ${factorItem.userSelectedFactor.slice(7)}`}</h2>
            <table>
              <tbody>
                <tr>
                  <th>{t('Threshold')}</th>
                  <th>{t('Z score')}</th>
                  <th>{t('Q Sort Value')}</th>
                  <th>{t('Number')}</th>
                  <th>{t('Statement')}</th>
                </tr>
                {displayData[index1].distStates.map((item, index) => (
                  <tr key={`key${index.toString()}`}>
                    <td>{item.sigLevelText}</td>
                    <td className="zScr">{item.zScore}</td>
                    <td className="num">{item.sortValue}</td>
                    <td className="num">{item.statement}</td>
                    <td className="statement">{item.sortStatement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </Container1>
    );
  }
  return (
    <h2 style={{ marginTop: 50, marginLeft: 50 }}>
      {t('Select factors for output in the Options tab')}
    </h2>
  );
};

export default DistinguishingStatementsList;

const Container1 = styled.div`
  padding-bottom: 150px;
  padding-right: 20px;

  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 5px;
  }

  tr:nth-child(even) {
    background-color: #eee;
  }

  tr:hover {
    background-color: rgba(131, 202, 254, 0.6);
  }

  .zScr {
    text-align: right;
  }

  .num {
    text-align: center;
  }

  .statement {
    min-width: 600px;
  }
`;
