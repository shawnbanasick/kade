import React from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const SortsList = props => {
  return (
    <ul>
      {props.sortsDisplayText.map(function(listValue, index) {
        return (
          <div key={uuidv4()}>
            <StyledPartName key={listValue["key"]}>
              {props.respondentNames[index]}
            </StyledPartName>
            {listValue["sortArray"].map(function(item, index2) {
              if (index2 === 0) {
                return (
                  <QitemHeader key={`${listValue["key"]}_${index2}`}>
                    {item}
                  </QitemHeader>
                );
              } else {
                return (
                  <Qitem key={`${listValue["key"]}_${index2}_99`}>{item}</Qitem>
                );
              }
            })}
            <br />
            <br />
          </div>
        );
      })}
    </ul>
  );
};

export default SortsList;

const Qitem = styled.li`
  white-space: pre;
  font-family: Courier New;
  font-weight: bold;
  list-style-type: none;
`;

const QitemHeader = styled.li`
  font-weight: bold;
  list-style-type: none;
  white-space: pre;
  font-family: Courier New;
  text-decoration: underline;
`;

const StyledPartName = styled.h3`
  font-weight: bold;
  white-space: pre;
`;
