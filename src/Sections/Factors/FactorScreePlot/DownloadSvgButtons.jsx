import React from "react";
import styled from "styled-components";
import downloadSvgImage from "./downloadSvgImage";
import downloadPngImage from "./downloadPngImage";
import GeneralButton from "../../../Utils/GeneralButton";
import { useTranslation } from "react-i18next";

const DownloadSvgButtons = () => {
  const { t } = useTranslation();

  return (
    <div style={{ display: "flex", marginTop: 30, marginRight: 15 }}>
      <GeneralButton id="downloadSvgButtonScree" onClick={downloadSvgImage}>
        {t("Download SVG")}
      </GeneralButton>
      <GeneralPNGButton
        as={GeneralButton}
        id="downloadPngButtonScree"
        onClick={downloadPngImage}
      >
        {t("Download PNG")}
      </GeneralPNGButton>
    </div>
  );
};
export default DownloadSvgButtons;

const GeneralPNGButton = styled.div`
  margin-left: 15px;
`;
