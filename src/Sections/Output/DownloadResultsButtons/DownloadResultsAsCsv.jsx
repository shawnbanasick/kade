import React from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import downloadResultsAsCsv from "../downloadCsvLogic/downloadCsvOutputFile";
import GeneralButton from "../../../Utils/GeneralButton";
import outputState from "../../GlobalState/outputState";
import { useTranslation } from "react-i18next";

const clone = require("rfdc")();

const localStore = store({
  modalOpen: false
});

const handleOpen = () => {
  // getState
  const userSelectedFactors = clone(outputState.userSelectedFactors);
  if (userSelectedFactors.length === 0) {
    // console.log("must select factors first");
    localStore.modalOpen = true;
  } else {
    downloadResultsAsCsv();
  }
};

const handleClose = () => {
  localStore.modalOpen = false;
};

const DownloadResultsAsCsv1 = () => {
  const { t } = useTranslation();

  const { active } = localStore;
  return (
    <Modal
      dimmer={"blurring"}
      trigger={
        <CsvButton
          as={GeneralButton}
          id="downloadResultsAsCsvButton"
          isActive={active}
          onClick={handleOpen}
        >
          {t("CSV File")}
        </CsvButton>
      }
      open={localStore.modalOpen}
      onClose={handleClose}
      basic
      size="small"
    >
      <Header content={t("Analysis Output")} />
      <Modal.Content>
        <span style={{ fontSize: 30 }}>
          {t("Select the factors to output first")}
        </span>
      </Modal.Content>
      <Modal.Actions>
        <Button
          id="downloadResultsAsCsvModalGotItButton"
          size={"huge"}
          color="green"
          onClick={handleClose}
          inverted
        >
          {t("Got it")}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default view(DownloadResultsAsCsv1);

const CsvButton = styled.div`
  min-width: 100px;
  margin-right: 20px;
`;
