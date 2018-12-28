import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import state from "../../store";

const localStore = store({ state });

class DisplayState extends Component {
  render() {
    const result = Object.keys(state).map(key => {
      if (typeof state[key] === "function") {
        return [key, "function"];
      }
      if (typeof state[key] === "object") {
        return [key, "array or object"];
      }
      return [key, state[key].toString()];
    });
    localStore.state = result;
    // console.log(this.props);
    return (
      <OrderedList>
        {localStore.state.map((value, index) => (
          <li
            style={{ width: 1150, wordWrap: "break-word" }}
            key={value + index.toString()}
          >
            {value[0]}
            {": "}
            {value[1]}
          </li>
        ))}
      </OrderedList>
    );
  }
}

export default view(DisplayState);

const OrderedList = styled.ul`
  width: 80%;
  margin-top: 50px;
`;
