import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import UserSelectionSwitch from "./UserSelectionSwitch";
import UserTextInput from "./UserTextInput";

const styles = {
    marginLeft: 10,
    marginTop: 8,
    width: 150,
    marginBottom: 1,
    height: 20
};

class CardSettingsPanel extends Component {
    render() {
        return (
            <div style={ { marginTop: 30 } }>
              <span style={ { fontSize: 32 } }>Cards</span>
              <hr style={ { width: 900, margin: 0 } } />
              <div className="switchDiv">
                <span className="switchText">5. Adjust card height?</span>
                <UserSelectionSwitch name="willAdjustCardHeight" value="willAdjustCardHeight" toggle={ false } />
                <div style={ styles }>
                  <UserTextInput name={ "willAdjustCardHeightBy" } placeholder={ "110" } width={ 8 } />
                </div>
              </div>
              <div className="switchDiv">
                <span className="switchText">6. Adjust card width?</span>
                <UserSelectionSwitch name="willAdjustCardWidth" value="willAdjustCardWidth" toggle={ false } />
                <div style={ styles }>
                  <UserTextInput name={ "willAdjustCardWidthBy" } placeholder={ "110" } width={ 8 } />
                </div>
              </div>
              <div className="switchDiv">
                <span className="switchText">7. Adjust font size?</span>
                <UserSelectionSwitch name="willAdjustCardFontSize" value="willAdjustCardFontSize" toggle={ false } />
                <div style={ styles }>
                  <UserTextInput name={ "willAdjustCardFontSizeBy" } placeholder={ "13" } width={ 8 } />
                </div>
              </div>
            </div>
            );
    }
}

export default easyComp(CardSettingsPanel);
