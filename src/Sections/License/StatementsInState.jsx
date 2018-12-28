import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import state from "../../store";

const statements = state.statements;
const localStore = store({ statements });

class StatementsInState extends Component {
  render() {
    // console.log(JSON.stringify(localStore.statements));
    return (
      <OrderedList>
        {localStore.statements.map((value, index) => (
          <li
            style={{ width: 1150, wordWrap: "break-word" }}
            key={value + index.toString()}
          >
            {value}
          </li>
        ))}
      </OrderedList>
    );
  }
}

export default view(StatementsInState);

const OrderedList = styled.ol`
  width: 80%;
  margin-top: 50px;
`;
