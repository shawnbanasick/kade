import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import UserSelectionSwitch from "./UserSelectionSwitch";
import UserTextInput from "./UserTextInput";
import CustomFileNameLocation from './CustomFileNameLocation';

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
            <div style={ { marginTop: 30 } }>
              <span style={ { fontSize: 32 } }>
                                          Downloads
                                      </span>
              <hr style={ { width: 900, margin: 0 } } />
              <div className="switchDiv">
                <span className="switchText">
                                           15. Add custom name to image downloads?
                                        </span>
                <UserSelectionSwitch name="willAddCustomNameToDownload" value="willAddCustomNameToDownload" toggle={ false } />
              </div>
              <div style={ { marginTop: 10 } }>
                <UserTextInput name={ "customDownloadFileNames" } label='names' placeholder={ "Input custom file name" } width={ 6 } />
              </div>
              <CustomFileNameLocation />
            </div>
            );
    }
}

export default easyComp(DistinguishingPanel);
