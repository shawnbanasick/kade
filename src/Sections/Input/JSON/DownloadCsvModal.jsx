import styled from "styled-components";
import React from "react";
import downloadCSVdata from "./downloadCSVdata";
import LoadButton from "../DemoData/LoadButton";
import inputState from "../../GlobalState/inputState";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const handleClick = () => {
  const isJsonLoaded = inputState.showJsonFileLoadedMessage;
  if (isJsonLoaded) {
    downloadCSVdata();
  } else {
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = i18n.t("No data to download");
    inputState.extendedErrorMessage = i18n.t("No data available for download");
  }
};

const DownloadCsvModal = () => {
  const { t } = useTranslation();

  return (
    <GridContainerDiv>
      <LoadButton onClick={handleClick}>
        {t("Download JSON data as CSV")}
      </LoadButton>
    </GridContainerDiv>
  );
};
export default DownloadCsvModal;

const GridContainerDiv = styled.div`
  grid-column-start: 3;
  grid-row-start: 1;
`;
