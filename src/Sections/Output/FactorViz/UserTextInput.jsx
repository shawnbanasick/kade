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
    // this.setState({
    //   [name]: value
    // });
    // const tempObj = {};
    // const customFactorNames = this.props.name;
    // tempObj[customFactorNames] = e.target.value;
    // state.setState(tempObj);

    const factorVizOptionsHolder = state.getState("factorVizOptionsHolder");
    // const stateFrag = {};
    const key = this.props.name;
    // const stateValue = !localStore.toggle;
    factorVizOptionsHolder[key] = e.target.value;
    // stateFrag[key] = stateValue;
    console.log(`holder: ${JSON.stringify(factorVizOptionsHolder)}`);

    state.setState({ factorVizOptionsHolder });
  }

  render() {
    // const {name} = this.state;
    return (
      <div>
        <Form>
          <Form.Field>
            <Form.Input
              placeholder={this.props.placeholder}
              width={this.props.width}
              name={this.props.name}
              value={this.props.value}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default UserTextInput;
