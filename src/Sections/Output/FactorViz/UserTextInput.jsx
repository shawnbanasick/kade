import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import state from "../../../store";

class UserTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const factorVizOptionsHolder = state.getState("factorVizOptionsHolder");
    const key = this.props.name;
    factorVizOptionsHolder[key] = e.target.value;
    state.setState({
      factorVizOptionsHolder,
      updateFactorVisualizationsButtonColor: "orange"
    });
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <Form.Input placeholder={ this.props.placeholder } width={ this.props.width } name={ this.props.name } value={ this.props.value } onChange={ this.handleChange } />
          </Form.Field>
        </Form>
      </div>
      );
  }
}

export default UserTextInput;

