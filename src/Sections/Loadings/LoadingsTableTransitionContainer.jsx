import store from '../store';
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import LoadingsTable from "./LoadingsTable/LoadingsTable";
import { Transition } from 'semantic-ui-react';

class LoadingsTableTransitionContainer extends Component {
    render() {
        let showLoadingsTable = store.getState("showLoadingsTable");
        return (
            <Transition visible={ showLoadingsTable } animation="fade" duration={ 1000 }>
              <div>
                <LoadingsTable />
              </div>
            </Transition>
            );
    }
}

export default easyComp(LoadingsTableTransitionContainer);
