import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Transition } from "semantic-ui-react";
import store from "../../../store";
import DownloadResultsAsExcel from "./DownloadResultsAsExcel";
import DownloadResultsAsCsv from "./DownloadResultsAsCsv";
// import RemoveTimestampOption from "./RemoveTimestampOption";

class DownloadResultsButtons extends React.Component {
  render() {
    const showDownloadOutputButtons = store.getState(
      "showDownloadOutputButtons"
    );
    return (
      <Transition
        visible={showDownloadOutputButtons}
        animation="fade"
        duration={1000}
      >
        <div>
          <DownloadOutputButtons>
            <OutputDownloadLabel>
              Download complete output as:
            </OutputDownloadLabel>
            <DownloadResultsAsExcel />
            <DownloadResultsAsCsv />
          </DownloadOutputButtons>
        </div>
      </Transition>
    );
  }
}

export default view(DownloadResultsButtons);

const DownloadOutputButtons = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 800px;
  height: 100px;
`;

const OutputDownloadLabel = styled.div`
  font-size: 26px;
  margin-right: 5px;
`;
