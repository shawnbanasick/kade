import React, { Component } from "react";
import UserTextInput from "./UserTextInput";
import { easyComp } from "react-easy-state";
import UserSelectionSwitch from "./UserSelectionSwitch";

const styles = {
  fontSize: 32
};

class GeneralOptionsPanel extends Component {
  render() {
    return (
      <div>
        <span style={ styles }>General</span>
        <hr style={ { width: 900, margin: 0 } } />
        <div className="switchDiv">
          <span className="switchText">1. Include legend with image?</span>
          <UserSelectionSwitch name="willIncludeLegend" value="willIncludeLegend" toggle={ true } />
        </div>
        <div className="switchDiv">
          <span className="switchText">2. Prepend statement numbers?</span>
          <UserSelectionSwitch name="willPrependStateNums" value="willPrependStateNums" toggle={ false } />
        </div>
        <div className="switchDiv">
          <span className="switchText">3. Display only statement numbers?</span>
          <UserSelectionSwitch name="willDisplayOnlyStateNums" value="willDisplayOnlyStateNums" toggle={ false } />
        </div>
        <div className="switchDiv">
          <span className="switchText">
                  4. Add custom names to factor images?
                </span>
          <UserSelectionSwitch name="willAddCustomNames" value="willAddCustomNames" toggle={ false } />
        </div>
        <div style={ { marginTop: 10 } }>
          <UserTextInput name={ "customFactorNames" } label="names" placeholder={ "Input custom factor names separated by commas" } width={ 15 } />
        </div>
      </div>
      );
  }
}

export default easyComp(GeneralOptionsPanel);
