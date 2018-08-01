import React, { Component } from 'react';
import { view } from "react-easy-state";
import styled from "styled-components";


class Start extends Component {
    render() {
        return (
            <MainContent>
              <LanguageSelection>
                Language
              </LanguageSelection>
              <p>Kanded</p>
              <p>web links:</p>
              <p>square div 1</p>
              <p>square div 2</p>
            </MainContent>
            );
    }
}

export default view(Start);




const MainContent = styled.div`
  display: grid;
  grid-template-columns: 190px 190px 190px 190px;
  grid-template-rows: 50px 125px 125px 200px 200px 50px;
  background-color: white;
  height: 100%;
  width: 100%;
`;

const LanguageSelection = styled.div`
    grid-column-start: 4;
`;