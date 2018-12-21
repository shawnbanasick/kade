import React, { Component } from "react";
import { view } from "react-easy-state";
import UserSelectionSwitch from "./UserSelectionSwitch";
import UserTextInput from "./UserTextInput";
import CustomFileNameLocation from "./CustomFileNameLocation";
import styled from "styled-components";

// const styles = {
//     marginLeft: 10,
//     marginTop: 8,
//     width: 150,
//     marginBottom: 1,
//     height: 20
// };

class DistinguishingPanel extends Component {
  render() {
    return (
      <div style={{ marginTop: 40 }}>
        <span style={{ fontSize: 32 }}>Downloads</span>
        <hr style={{ width: "100%", marginBottom: 15 }} />
        <OptionStatementRow>
          <OptionStatementText>
            16. Add custom name to image downloads?
          </OptionStatementText>
          <UserSelectionSwitch
            name="willAddCustomNameToDownload"
            value="willAddCustomNameToDownload"
            toggle={false}
          />
        </OptionStatementRow>
        <div>
          <UserTextInput
            name={"customDownloadFileNames"}
            label="names"
            placeholder={"Input custom file name"}
            width={6}
          />
        </div>
        <CustomFileNameLocation />
      </div>
    );
  }
}

export default view(DistinguishingPanel);

const OptionStatementRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-left: 10px;
`;

const OptionStatementText = styled.div`
  font-size: 20px;
`;

// import styled from "styled-components";
