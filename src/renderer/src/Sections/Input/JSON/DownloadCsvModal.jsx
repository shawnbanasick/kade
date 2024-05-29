import styled from 'styled-components';
import downloadCSVdata from './downloadCSVdata';
import LoadButton from '../DemoData/LoadButton';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import CsvIcon from '../../images/CSV_Icon2.svg';

const DownloadCsvModal = () => {
  const { t } = useTranslation();
  const isJsonLoaded = inputState((state) => state.showJsonFileLoadedMessage);
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);

  const handleClick = () => {
    if (isJsonLoaded) {
      downloadCSVdata();
    } else {
      updateShowErrorMessageBar(true);
      updateErrorMessage(i18n.t('No data to download'));
      updateExtendedErrorMessage(i18n.t('No data available for download'));
    }
  };

  return (
    <GridContainerDiv>
      <LoadButton onClick={handleClick}>
        <LineContainer>
          <SvgContainer>
            <img src={CsvIcon} height="50px" alt="CSV Icon" />
          </SvgContainer>
          {t('Download JSON Data')}
        </LineContainer>
      </LoadButton>
    </GridContainerDiv>
  );
};
export default DownloadCsvModal;

const GridContainerDiv = styled.div`
  grid-column-start: 3;
  grid-row-start: 1;
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
