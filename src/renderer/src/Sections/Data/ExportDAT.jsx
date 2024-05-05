import styled from 'styled-components';
import GeneralButton from '../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import coreState from '../GlobalState/coreState';
import createPQMethodDAT from './createPqmethodDat';
import * as FileSaver from 'file-saver';
import DatIcon from '../images/DAT_Icon.svg';
import cloneDeep from 'lodash/cloneDeep';

const ExportDatButton = () => {
  const { t } = useTranslation();

  const mainDataObject2 = coreState((state) => state.mainDataObject);
  const mainDataObject = cloneDeep(mainDataObject2);
  const multiplierArray = coreState((state) => state.multiplierArray);
  const projectName = coreState((state) => state.projectName);
  const statements = coreState((state) => state.statements);
  const respondentNames = coreState((state) => state.respondentNames);

  const handleOnClick = async () => {
    let datString = createPQMethodDAT(
      mainDataObject,
      multiplierArray,
      projectName,
      statements.length,
      respondentNames
    );

    var blob = new Blob([datString], {
      type: 'text/plain;charset=ascii',
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

export default ExportDatButton;

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
