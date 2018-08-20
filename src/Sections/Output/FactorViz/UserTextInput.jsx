import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import store from "../../../store";

class UserTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value
    });
    const tempObj = {};
    const customFactorNames = this.props.name;
    tempObj[customFactorNames] = e.target.value;
    store.setState(tempObj);
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
