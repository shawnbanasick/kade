import React from "react";
import { Button, Dropdown } from "semantic-ui-react";
import store from "../../../store";

const saveDropdownValueToState = (event, data) => {
    store.setState({
        numCentroidFactors: data.value
    });
};

const options = [
    {
        key: "factor1",
        text: "1",
        value: 1
    },
    {
        key: "factor2",
        text: "2",
        value: 2
    },
    {
        key: "factor3",
        text: "3",
        value: 3
    },
    {
        key: "factor4",
        text: "4",
        value: 4
    },
    {
        key: "factor5",
        text: "5",
        value: 5
    },
    {
        key: "factor6",
        text: "6",
        value: 6
    },
    {
        key: "factor7",
        text: "7",
        value: 7
    },
    {
        key: "factor8",
        text: "8",
        value: 8
    }
];

const DropdownMultipleSelection = () => (
    <div>
      <span style={ { marginRight: 10 } }>Extract</span>
      <Button.Group size={ "big" } color="black" basic>
        <Dropdown id="centroidSelectDropdown" placeholder={ "?" } defaultValue={ 7 } onChange={ saveDropdownValueToState } openOnFocus={ true } button simple item options={ options }
        />
      </Button.Group>
    </div>
);

export default DropdownMultipleSelection;

