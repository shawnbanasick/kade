import React, { Component } from "react";
import { view } from "react-easy-state";
import UserSelectionSwitch from "./UserSelectionSwitch";
import UserTextInput from "./UserTextInput";
// import ColorSelector from "./ColorSelector";

const styles = {
    marginLeft: 10,
    marginTop: 8,
    width: 150,
    marginBottom: 1,
    height: 20
};

class DistinguishingPanel extends Component {
    render() {
        return (
            <div style={ { marginTop: 30 } }>
              <span style={ { fontSize: 32 } }>
                                  Distinguishing and Consensus Statements
                                </span>
              <hr style={ { width: "100%", margin: 0 } } />
              <div className="switchDiv">
                <span className="switchText">
                                    12. Indicate distinguishing statements?
                                  </span>
                <UserSelectionSwitch name="willIndicateDistinguishing" value="willIndicateDistinguishing" toggle />
              </div>
              { /* <div className="switchDiv">
                                                                <span className="switchText">
                                                                        -- Use unicode as distinguishing statement indicator?
                                                                      </span>
                                                                <UserSelectionSwitch name="willUseDistingUnicode" value="willUseDistingUnicode" toggle={ true } />
                                                              </div> */ }
              <div className="switchDiv">
                <span className="switchText">
                                    -- Adjust distinguishing statement indicator size?
                                  </span>
                <UserSelectionSwitch name="willAdjustDistIndicatorSize" value="willAdjustDistIndicatorSize" toggle={ false } />
                <div style={ styles }>
                  <UserTextInput name={ "willAdjustDistIndicatorSizeBy" } placeholder={ "12" } width={ 8 } />
                </div>
              </div>
              <div className="switchDiv">
                <span className="switchText">
                                    13. Display distinguishing statement comparison triangles?
                                  </span>
                <UserSelectionSwitch name="willDisplayDistingCompareSymbols" value="willDisplayDistingCompareSymbols" toggle />
              </div>
            </div>
            );
    }
}

export default view(DistinguishingPanel);
