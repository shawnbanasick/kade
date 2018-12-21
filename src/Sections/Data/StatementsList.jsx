import React, { Component } from "react";
import { view } from "react-easy-state";
// import store from "../../store";

class StatementList extends Component {
  render() {
    return (
      <ol>
        { this.props.statements.map((listValue, index) => (
            <li key={ listValue + index }>
              { listValue }
            </li>
          )) }
      </ol>
      );
  }
}

export default view(StatementList);
