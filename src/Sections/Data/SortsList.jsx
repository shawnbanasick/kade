import React, { Component } from "react";
import { view } from "react-easy-state";

class SortsList extends Component {
  render() {
    return (
      <ol>
        {this.props.displayText.map(listValue => (
          <li
            style={{ width: 1150, wordWrap: "break-word" }}
            key={listValue.toString()}
          >
            {listValue}
          </li>
        ))}
      </ol>
    );
  }
}

export default view(SortsList);
