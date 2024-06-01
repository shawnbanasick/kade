import React from 'react';
import styled from 'styled-components';
import downloadSvgImage from './downloadSvgImage';
import downloadPngImage from './downloadPngImage';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import SvgIcon from '../../images/SVG_Icon2.svg';
import PngIcon from '../../images/PNG_Icon2.svg';

const DownloadSvgButtons = () => {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', marginTop: 30, marginRight: 15 }}>
      <GeneralPNGButton id="downloadSvgButtonScree" as={GeneralButton} onClick={downloadSvgImage}>
        <LineContainer>
          <SvgContainer>
            <img src={SvgIcon} height="50px" alt="SVG Icon" />
          </SvgContainer>
          {t('Download Vector Image')}
        </LineContainer>
      </GeneralPNGButton>
      <GeneralPNGButton as={GeneralButton} id="downloadPngButtonScree" onClick={downloadPngImage}>
        <LineContainer>
          <SvgContainer>
            <img src={PngIcon} height="50px" alt="Png Icon" />
          </SvgContainer>
          {t('Download Raster Image')}
        </LineContainer>
      </GeneralPNGButton>
    </div>
  );
};
export default DownloadSvgButtons;

const GeneralPNGButton = styled.div`
  margin-left: 15px;
  min-width: 300px;
  margin-bottom: 50px;
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
