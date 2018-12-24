import { view } from "react-easy-state";
import React, { Component } from "react";

class StatementList extends Component {
  render() {
    let mapKey = 1;
    return (
      <ol>
        {this.props.statements.map(listValue => (
          <li key={mapKey++}>{listValue}</li>
        ))}
      </ol>
    );
  }
}

export default view(StatementList);
