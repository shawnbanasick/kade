import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import GeneralButton from '../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import coreState from '../GlobalState/coreState';
import createPQMethodDAT from './createPqmethodDat';
import * as FileSaver from 'file-saver';
import DatIcon from '../images/DAT_Icon.svg';

const UnforcedSortsDisplayButton = (props) => {
  const { t } = useTranslation();

  const handleOnClick = async () => {
    let mainDataObject2 = coreState.mainDataObject;
    let mainDataObject = JSON.parse(JSON.stringify(mainDataObject2));

    let multiplierArray = [...coreState.multiplierArray];
    let projectName = coreState.projectName;
    let statements = [...coreState.statements];
    let respondentNames = [...coreState.respondentNames];

    let datString = createPQMethodDAT(
      mainDataObject,
      multiplierArray,
      projectName,
      statements.length,
      respondentNames
    );

    var blob = new Blob([datString], {
      type: 'text/plain;charset=ascii'
    });
    FileSaver.saveAs(blob, `${projectName.substring(0, 8)}.DAT`);
  };

  return (
    <Button as={GeneralButton} onClick={handleOnClick}>
      <LineContainer>
        <SvgContainer>
          <img src={DatIcon} height="50px" alt="CSV Icon" />
        </SvgContainer>
        <p>{t('Q sorts')}</p>
      </LineContainer>
    </Button>
  );
};

export default view(UnforcedSortsDisplayButton);

const Button = styled.button`
  background-color: ${(props) => props.buttonColor};
  min-width: 180px;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const SvgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-left: 10;
`;
