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

class StatementsSettingsPanel extends Component {
  render() {
    return (
      <div style={ { marginTop: 30 } }>
        <span style={ { fontSize: 32 } }>Statements</span>
        <hr style={ { width: 900, margin: 0 } } />
        <div className="switchDiv">
          <span className="switchText">8. Adjust line spacing?</span>
          <UserSelectionSwitch name="willAdjustLineSpacing" value="willAdjustLineSpacing" toggle={ false } />
          <div style={ styles }>
            <UserTextInput name={ "willAdjustLineSpacingBy" } placeholder={ "1.4" } width={ 8 } />
          </div>
        </div>
        <div className="switchDiv">
          <span className="switchText">
                        9. Limit number of lines to prevent overflow?
                      </span>
          <UserSelectionSwitch name="willTrimStatement" value="willTrimStatement" toggle={ false } />
          <span className="switchText">max. number lines =</span>
          <div style={ styles }>
            <UserTextInput name={ "willTrimStatementBy" } placeholder={ "5" } width={ 6 } />
          </div>
        </div>
        <div className="switchDiv">
          <span className="switchText">10. Adjust statement width?</span>
          <UserSelectionSwitch name="willAdjustStatementWidth" value="willAdjustStatementWidth" toggle={ false } />
          <div style={ styles }>
            <UserTextInput name={ "willAdjustStatementWidthBy" } placeholder={ "15" } width={ 8 } />
          </div>
        </div>
        <div className="switchDiv">
          <span className="switchText">
                        11. (Asian languages only) Adjust width of statement rows?
                      </span>
          <UserSelectionSwitch name="willAdjustWidthAsian" value="willAdjustWidthAsian" toggle={ false } />
          <div style={ styles }>
            <UserTextInput name={ "willAdjustWidthAsianBy" } placeholder={ "12" } width={ 8 } />
          </div>
        </div>
      </div>
      );
  }
}

export default easyComp(StatementsSettingsPanel);
