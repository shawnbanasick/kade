import styled from 'styled-components';
import outputState from '../../GlobalState/outputState';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import DocxIcon from '../../images/DOCX_Icon2.svg';

const DistStateListSortByButtons = () => {
  const { t } = useTranslation();
  const updateShowDocxOptions = outputState((state) => state.updateShowDocxOptions);
  const updateDownloadDocxButtonActive = outputState(
    (state) => state.updateDownloadDocxButtonActive
  );
  const downloadDocxButtonActive = outputState((state) => state.downloadDocxButtonActive);

  const handleOnclick = () => {
    updateShowDocxOptions(true);
    updateDownloadDocxButtonActive(true);
  };

  const shouldDisplayDistStateListButtons = true;
  if (shouldDisplayDistStateListButtons) {
    return (
      <StyledWrapper>
        <SortButton
          id={'DownloadDocxFile'}
          $isActive={downloadDocxButtonActive}
          onClick={handleOnclick}
          key={'f1'}
        >
          <LineContainer>
            <SvgContainer>
              <img src={DocxIcon} height="50px" alt="docx Icon" />
            </SvgContainer>
            {t('Document')}
          </LineContainer>
        </SortButton>
      </StyledWrapper>
    );
  }
  return null;
};

export default DistStateListSortByButtons;

const StyledWrapper = styled.div`
  display: flex;
  align-items: baseline;

  .wrapper1 {
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
    }
  }

  .downloadButton {
    margin-left: 120px;
  }
`;

const SortButton = styled(GeneralButton)`
  width: fit-content;
  min-width: 250px;
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
