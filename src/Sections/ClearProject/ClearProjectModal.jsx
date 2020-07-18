import React from "react";
import { view, store } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import initializeAppState from "../GlobalState/initializeAppState";
import initializeInputState from "../GlobalState/initializeInputState";
import initializeCorrelationState from "../GlobalState/initializeCorrelationState";
import initializeFactorState from "../GlobalState/initializeFactorState";
import initializeRotationState from "../GlobalState/initializeRotationState";
import initializeLoadingState from "../GlobalState/initializeLoadingState";
import initializeOutPutState from "../GlobalState/initializeOutputState";
import initializeProjectHistoryState from "../GlobalState/initializeProjectHistoryState";
import initializeVizState from "../GlobalState/initializeVizState";
import initializeCalcState from "../GlobalState/initializeCalcState";
import initializeCoreState from "../GlobalState/initializeCoreState";
import GeneralButton from "../../Utils/GeneralButton";
import { useTranslation } from "react-i18next";

const localStore = store({
  modalOpen: false
});

const handleOpen = () => {
  localStore.modalOpen = true;
};

const handleClose = () => {
  localStore.modalOpen = false;
};

const clearAnalysis = projectClearedTrans => {
  localStore.modalOpen = false;
  notify(projectClearedTrans);
  initializeInputState();
  initializeAppState();
  initializeCorrelationState();
  initializeFactorState();
  initializeRotationState();
  initializeLoadingState();
  initializeOutPutState();
  initializeProjectHistoryState();
  initializeVizState();
  initializeCalcState();
  initializeCoreState();
};

function notify(projectClearedTrans) {
  toast.success(projectClearedTrans);
}

const ClearProjectModal = () => {
  const { t } = useTranslation();
  const projectClearedTrans = t("Project Cleared");

  const style1 = { display: "flex" };
  const style2 = { alignSelf: "flexStart" };
  const style3 = { alignSelf: "flexEnd", marginLeft: 220 };

  return (
    <React.Fragment>
      <ToastContainer autoClose={2000} transition={Zoom} />
      <Modal
        dimmer={"blurring"}
        trigger={
          <GeneralButton onClick={handleOpen}>
            {t("Clear Project")}
          </GeneralButton>
        }
        open={localStore.modalOpen}
        className="wrapper1"
        onClose={handleClose}
        basic
        size={"small"}
      >
        <Header content={t("Clear Project")} />
        <Modal.Content>
          <h2>
            {t("Clearing the project will remove all data and analysis")}
            <br />
            {t("This action cannot be reversed")}
          </h2>
          <h2> {t("Are you sure you want to clear the current project")}</h2>
        </Modal.Content>
        <Modal.Actions>
          <div style={style1}>
            <Button
              size={"big"}
              style={style2}
              color="green"
              onClick={handleClose}
              inverted
            >
              {t("No Go Back")}
            </Button>
            <Button
              id="resetAnalysisModalGotItButton"
              size={"big"}
              style={style3}
              color="red"
              onClick={() => clearAnalysis(projectClearedTrans)}
              inverted
            >
              {t("Yes delete the data and analysis")}
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default view(ClearProjectModal);
