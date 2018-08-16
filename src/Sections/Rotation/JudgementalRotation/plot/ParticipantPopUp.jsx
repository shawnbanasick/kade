import React from "react";
import { easyComp } from "react-easy-state";
import store from "../../../store";

const styles = {
    height: 150,
    color: "white",
    background: "black",
    margin: 20,
    padding: 5
};

class ParticipantPopUp extends React.Component {
    render() {
        let respondent,
            factor1Value,
            factor2Value;
        let participantDataObject = store.getState("participantDataObject");
        if (participantDataObject !== false) {
            respondent = participantDataObject.respondent;
            factor1Value = participantDataObject.factor1;
            factor2Value = participantDataObject.factor2;
        }
        return (
            <div>
              { participantDataObject && (
                <span style={ styles }>
                                            { respondent } { "  " } { factor1Value }, { factor2Value }{ " " }
                                          </span>
                ) }
            </div>
            );
    }
}

export default easyComp(ParticipantPopUp);
