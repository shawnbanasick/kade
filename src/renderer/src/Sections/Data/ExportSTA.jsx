import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import GeneralButton from '../../Utils/GeneralButton';
import coreState from '../GlobalState/coreState';
import { useTranslation } from 'react-i18next';
import * as FileSaver from 'file-saver';
import StaIcon from '../images/STA_Icon.svg';

const UnforcedSortsDisplayButton = (props) => {
  const { t } = useTranslation();

  const projectName = coreState.projectName;
  const statements = [...coreState.statements];

  const handleOnClick = async () => {
    // Create statements.txt
    let statementsString = '';
    statements.forEach((statement) => {
      statementsString += statement + '\n';
    });

    const blob = new Blob([statementsString], {
      type: 'text/plain;charset=ascii'
    });
    FileSaver.saveAs(blob, `${projectName.substring(0, 8)}.STA`);
  };

  return (
    <Button as={GeneralButton} onClick={handleOnClick}>
      <LineContainer>
        <SvgContainer>
          <img src={StaIcon} height="50px" alt="CSV Icon" />
        </SvgContainer>
        <p>{t('Statements')}</p>
      </LineContainer>
    </Button>
  );
};

export default view(UnforcedSortsDisplayButton);

const Button = styled.button`
  background-color: ${(props) => props.buttonColor};
  min-width: 180px;
  margin-right: 20px;
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
