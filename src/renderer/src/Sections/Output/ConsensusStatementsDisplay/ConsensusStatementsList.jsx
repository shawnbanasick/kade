import { useMemo } from 'react';
import DistinguishingTypeButtons from '../DistinguishingStatementsDisplay/DistinguishingTypeButtons';
import DistStateListCohenSortByButtons from '../DistinguishingStatementsDisplay/DistStateListCohenSortByButtons';
import DistStateListCohensButton from '../DistinguishingStatementsDisplay/DistStateListCohensButton';
import outputState from '../../GlobalState/outputState';
import calcState from '../../GlobalState/calcState';
import calcConsensusData from './calcConsensusData';
import filterConsensusData from './filterConsensusData';
import calculateStephConsensusData from './calculateStephConsensusData';
import DistStateListButtons from '../DistinguishingStatementsDisplay/DistStateListButtons';
import { useTranslation } from 'react-i18next';
import DistStateListSortByButtons from '../DistinguishingStatementsDisplay/DistStateListSortByButtons';
import filterStephenConsensusData from './filterStephenConsensusData';

const ConsensusStatementsList = () => {
  const { t } = useTranslation();
  const consensusDisagreeArray = outputState((state) => state.consensusDisagreeArray);
  const cohensThreshold = outputState((state) => state.cohensThreshold);
  const sortCohensBy = outputState((state) => state.sortCohensBy);
  const distIdentType = outputState((state) => state.distIdentType);
  const threshold = outputState((state) => state.threshold);

  console.log('Consensus Statements List - consensusDisagreeArray:', consensusDisagreeArray);

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

  console.log('stephConsensus0001:', stephConsensus0001);
  console.log('stephConsensus0005:', stephConsensus0005);
  console.log('stephConsensus001:', stephConsensus001);
  console.log('stephConsensus005:', stephConsensus005);
  console.log('stephConsensus01:', stephConsensus01);
  console.log('stephConsensus05:', stephConsensus05);
  console.log('stephConsensus1:', stephConsensus1);
  console.log('stephConsensus15:', stephConsensus15);
  console.log('stephConsensus2:', stephConsensus2);

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

  const stephData = filterStephenConsensusData(stephConsensusData, threshold);

  console.log('Filtered Steph Consensus Data:', stephData);

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

  console.log('Consensus Statements List - consensusData:', consensusData);

  const consensusStatements = filterConsensusData(consensusData, cohensThreshold, sortCohensBy);

  if (distIdentType === 'stephensonMethod') {
    return (
      <div className="flex flex-col gap-4">
        <div className="mb-5 text-xl">
          {t('Interactive List')} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
          {t('Output thresholds are set in the Options section')}
        </div>
        <DistinguishingTypeButtons textSize="xl" />
        <DistStateListSortByButtons />
        <DistStateListButtons />
        {/* <div className="text-xl font-bold mt-8">{t('consensusStatementsList')}</div> */}
        <>
          <h2>{`${t('Consensus Statements')}`}</h2>
          <table className="border-collapse border border-black mb-10">
            <tbody>
              <tr>
                <th className="border border-black p-1.25">{t('Threshold')}</th>
                <th className="border border-black p-1.25">{t('Q Sort Values')}</th>
                <th className="border border-black p-1.25">{t('Number')}</th>
                <th className="border border-black p-1.25">{t('Statement')}</th>
              </tr>
              {stephData.map((statement, index) => (
                <tr
                  key={`key${index.toString()}`}
                  className={`hover:bg-[rgba(131,202,254,0.6)] ${index % 2 === 0 ? '' : 'bg-[#eee]'}`}
                >
                  <td className="border border-black p-1.25 text-center">
                    {statement.highestLevel}
                  </td>
                  <td className="border border-black p-1.25 text-center">{statement.qValues}</td>
                  <td className="border border-black p-1.25 text-center">{statement.stateNo}</td>
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
      <div className="flex flex-col gap-4">
        <DistinguishingTypeButtons />
        <DistStateListCohenSortByButtons />
        <DistStateListCohensButton />
        <div className="text-xl font-bold mt-8">{t('consensusStatementsList')}</div>
        <>
          <h2>{`${t('Consensus Statements')}`}</h2>
          <table className="border-collapse border border-black">
            <tbody>
              <tr>
                <th className="border border-black p-1.25">{t('Cohens d')}</th>
                <th className="border border-black p-1.25">{t('Q Sort Values')}</th>
                <th className="border border-black p-1.25">{t('Number')}</th>
                <th className="border border-black p-1.25">{t('Statement')}</th>
              </tr>
              {consensusStatements.map((statement, index) => (
                <tr
                  key={`key${index.toString()}`}
                  className={`hover:bg-[rgba(131,202,254,0.6)] ${index % 2 === 0 ? '' : 'bg-[#eee]'}`}
                >
                  <td className="border border-black p-1.25 text-center">
                    {statement.cutoffLevel}
                  </td>
                  <td className="border border-black p-1.25 text-center">{statement.qValues}</td>
                  <td className="border border-black p-1.25 text-center">{statement.statement}</td>
                  <td className="border border-black p-1.25 min-w-150">
                    {statement.sortStatement}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </div>
    );
  }
};

export default ConsensusStatementsList;
