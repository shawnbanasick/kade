import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import store from "../../../../store";

const styles = {
  height: 150,
  color: "white",
  background: "black",
  margin: 20,
  padding: 5
};

class ParticipantPopUp extends React.Component {
  render() {
    let respondent;
    let factor1Value;
    let factor2Value;
    const participantDataObject = store.getState("participantDataObject");
    if (participantDataObject !== false) {
      respondent = participantDataObject.respondent;
      factor1Value = participantDataObject.factor1;
      factor2Value = participantDataObject.factor2;
    }
    return (
      <div>
        {participantDataObject ? (
          <PopupDiv>
            <div>{respondent}</div>
            <div>{factor1Value},</div>
            <div>{factor2Value}</div>
          </PopupDiv>
        ) : (
          <PopupDiv>Hover to view participant data</PopupDiv>
        )}
      </div>
    );
  }
}

export default view(ParticipantPopUp);

const PopupDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 250px;
  color: whitesmoke;
  background: black;
  border-radius: 4px;
  padding: 5px;
`;
