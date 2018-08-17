import React from "react";
import store from '../../store';
import { easyComp } from "react-easy-state";
import { Transition } from "semantic-ui-react";
import DownloadResultsAsExcel from "./DownloadResultsAsExcel";
import DownloadResultsAsCsv from "./DownloadResultsAsCsv";
import RemoveTimestampOption from "./RemoveTimestampOption";

class DownloadResultsButtons extends React.Component {
    render() {
        let showDownloadOutputButtons = store.getState("showDownloadOutputButtons");
        return (
            <Transition visible={ showDownloadOutputButtons } animation="fade" duration={ 1000 }>
              <div style={ { paddingTop: 20, paddingBottom: 20, width: 800 } }>
                <span style={ { fontSize: 26, marginRight: 5 } }>Download complete output as:</span>
                <DownloadResultsAsExcel />
                <DownloadResultsAsCsv />
                <RemoveTimestampOption />
              </div>
            </Transition>
            );
    }
}

export default easyComp(DownloadResultsButtons);
