import styled from "styled-components";
import { view } from "react-easy-state";
import React, { Component } from "react";

class StatementList extends Component {
  render() {
    let mapKey = 1;
    return (
      <CustomUl>
        {this.props.texts.map(listValue => (
          <li key={mapKey++}>{listValue}</li>
        ))}
      </CustomUl>
    );
  }
}

export default view(StatementList);

const CustomUl = styled.ul`
  list-style-type: none;
  text-align: right;
  width: 167px;
  padding-left: 5px !important;
`;
