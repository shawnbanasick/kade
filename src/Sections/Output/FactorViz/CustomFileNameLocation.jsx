import React, { Component } from "react";
import { Form, Radio } from "semantic-ui-react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import state from "../../../store";
// import "./CustomFileNameLocation.css";

const styles = {
  display: "flex",
  marginTop: 15,
  fontSize: 20
};

const localStore = store({ customFileNameLocation: "" });

function handleChange(e, { value }) {
  const factorVizOptionsHolder = state.getState("factorVizOptionsHolder");
  localStore.customFileNameLocation = value;
  factorVizOptionsHolder.customFileNameLocation = value;
  state.setState({
    factorVizOptionsHolder,
    updateFactorVisualizationsButtonColor: "orange"
  });
};

class CustomFileNameLocation extends Component {
  render() {
    return (
      <HolderDiv>
        <Form style={styles}>
          <Form.Field>Custom name position:</Form.Field>
          <Form.Field>
            <Radio
              style={{ marginLeft: 16, fontSize: 20 }}
              label="Prepend"
              name="radioGroup"
              value="prepend"
              checked={localStore.customFileNameLocation === "prepend"}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              style={{ marginLeft: 16, fontSize: 20 }}
              label="Append"
              name="radioGroup"
              value="append"
              checked={localStore.customFileNameLocation === "append"}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              style={{ marginLeft: 16, fontSize: 20 }}
              label="Replace"
              name="radioGroup"
              value="replace"
              checked={localStore.customFileNameLocation === "replace"}
              onChange={handleChange}
            />
          </Form.Field>
        </Form>
      </HolderDiv>
    );
  }
}

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
