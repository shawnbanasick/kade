import React from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import downloadExcelDispatch from "../downloadExcelLogic/1_downloadExcelDispatch";
import GeneralButton from "../../../Utils/GeneralButton";
import outputState from "../../GlobalState/outputState";
import { useTranslation } from "react-i18next";

const clone = require("rfdc")();

const localStore = store({
  modalOpen: false
});

const handleOpen = () => {
  const userSelectedFactors = clone(outputState.userSelectedFactors);
  if (userSelectedFactors.length === 0) {
    localStore.modalOpen = true;
  } else {
    downloadExcelDispatch();
  }
};

const handleClose = () => {
  localStore.modalOpen = false;
};

const DownloadResultsAsExcel = () => {
  const { t } = useTranslation();

  const { active } = localStore;
  return (
    <Modal
      dimmer={"blurring"}
      trigger={
        <ExcelButton
          as={GeneralButton}
          id="downloadResultsAsExcelButton"
          isActive={active}
          onClick={handleOpen}
        >
          {t("Excel File")}
        </ExcelButton>
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
          id="downloadResultsAsExcelModalGotItButton"
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

export default view(DownloadResultsAsExcel);

const ExcelButton = styled.div`
  min-width: 100px;
  margin-right: 20px;
`;
