import React from "react";
import { toast } from "react-toastify";
import { Dropdown } from "semantic-ui-react";
import { view, store } from "react-easy-state";
import state from "../../../store";

const localStore = store({
  options: [],
  activeValue: ""
});

function formatOptions(rawOptions) {
  const formattedOptions = [];
  for (let i = 0; i < rawOptions.length; i += 1) {
    const tempObj = {};
    const value = rawOptions[i];
    tempObj.key = [`${i}key`];
    tempObj.text = value;
    tempObj.value = value;
    formattedOptions.push(tempObj);
  }
  return formattedOptions;
}

class DropdownJSON extends React.Component {
  constructor(props) {
    super(props);
    this.saveDropdownValueToState = this.saveDropdownValueToState.bind(this);
  }
  saveDropdownValueToState(event, data) {
    localStore.activeValue = data.value;
    this.props.onChangeMessageUpTree(data.value);
    toast.dismiss();
    state.setState({
      notifyDataUploadSuccess: true,
      isLoadJsonQsortsButtonGreen: true,
    });
  }

  render() {
    const options = formatOptions(this.props.options);
    localStore.options = options;
    return (
      <div role="listbox">
        <span style={ { marginRight: 10, fontSize: 20 } }>ID: </span>
        <Dropdown placeholder={ "Select Participant ID" } onChange={ this.saveDropdownValueToState } openOnFocus scrolling value={ localStore.activeValue } button options={ localStore.options } />
      </div>
      );
  }
}
export default view(DropdownJSON);
