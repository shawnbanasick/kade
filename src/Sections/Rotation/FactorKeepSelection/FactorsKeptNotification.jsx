import store from "../../store";
import "./FactorsKeptNotification.css";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { Transition } from 'semantic-ui-react';

class FactorsKeptNotification extends Component {
    render() {
        let numFactorsKept = store.getState("numFactorsKeptForRot");
        let shouldDisplayDiv = store.getState("shouldDisplayFacKept");

        // if (shouldDisplayDiv) {
        return (
            <Transition visible={ shouldDisplayDiv } animation="fade" duration={ 1000 }>
              <p className="factorsKeptDiv">
                { numFactorsKept } factors kept for rotation.
              </p>
            </Transition>
            );
    // }
    // return null;
    }
}

export default easyComp(FactorsKeptNotification);
