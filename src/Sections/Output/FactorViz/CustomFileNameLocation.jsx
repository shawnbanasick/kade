import React from "react";
import { Form, Radio } from "semantic-ui-react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import vizState from "../../GlobalState/vizState";
import { useTranslation } from "react-i18next";

const clone = require("rfdc")();

// import "./CustomFileNameLocation.css";

const styles = {
  display: "flex",
  marginTop: 15,
  fontSize: 20,
  userSelect: "none"
};

const localStore = store({ customFileNameLocation: "" });

function handleChange(e, { value }) {
  const factorVizOptionsHolder = clone(vizState.factorVizOptionsHolder);
  localStore.customFileNameLocation = value;
  factorVizOptionsHolder.customFileNameLocation = value;
  vizState.factorVizOptionsHolder = factorVizOptionsHolder;
  vizState.updateFactorVisualizationsButtonColor = "orange";
}

const CustomFileNameLocation = () => {
  const { t } = useTranslation();

  return (
    <HolderDiv>
      <Form style={styles}>
        <Form.Field>{t("Custom name position")}</Form.Field>
        <Form.Field>
          <Radio
            style={{ marginLeft: 16, fontSize: 20 }}
            label={t("Prepend")}
            name="radioGroup"
            value="prepend"
            checked={localStore.customFileNameLocation === "prepend"}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            style={{ marginLeft: 16, fontSize: 20 }}
            label={t("Append")}
            name="radioGroup"
            value="append"
            checked={localStore.customFileNameLocation === "append"}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            style={{ marginLeft: 16, fontSize: 20 }}
            label={t("Replace")}
            name="radioGroup"
            value="replace"
            checked={localStore.customFileNameLocation === "replace"}
            onChange={handleChange}
          />
        </Form.Field>
      </Form>
    </HolderDiv>
  );
};
export default view(CustomFileNameLocation);

/*
.ui.radio.checkbox label {
    padding-left: 18px !important;
}
*/

const HolderDiv = styled.div`
  label {
    padding-left: 18px !important;
  }
`;
