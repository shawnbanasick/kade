import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";



class StatementList extends Component {
    render() {
        return (
            <CustomUl>
              { this.props.texts.map((listValue, index) => (
                    <li key={ listValue + index }>
                      { listValue }
                    </li>
                )) }
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