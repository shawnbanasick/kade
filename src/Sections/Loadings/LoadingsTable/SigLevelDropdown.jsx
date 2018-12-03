import React from "react";
import { Dropdown } from "semantic-ui-react";
import { view, store } from "react-easy-state";
import state from "../../../store";

// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]
const sigOptions = [
  {
    key: "99.99",
    value: 3.906,
    text: "p < 0.0001" // text: "99.99%"
  },
  {
    key: "99.9",
    value: 3.291,
    text: "p < 0.001" // text: "99.9%"
  },
  {
    key: "99",
    value: 2.575,
    text: "p < 0.01" // text: "99%"
  },
  {
    key: "95",
    value: 1.96,
    text: "p < 0.05" // text: "95%"
  },
  {
    key: "90",
    value: 1.645,
    text: "p < 0.1" // text: "90%"
  },
  {
    key: "Com",
    value: "majority",
    text: "Majority of Common Variance"
  }
];

const localStore = store({
  value: 1.96
});

class SigLevelDropdown extends React.Component {
  handleChange(e, { value }) {
    localStore.value = value;
    state.setState({
      userSelectedSigLevel: value
    });
  }

  render() {
    const value = localStore.value;
    return (
      <Dropdown
        style={{ border: "1px solid black" }}
        onChange={this.handleChange}
        defaultValue={value}
        openOnFocus
        button
        simple
        item
        options={sigOptions}
      />
    );
  }
}

export default view(SigLevelDropdown);

/*
'Significance Threshold'
https://www.slideshare.net/zoubamohamed/table-values

99.99 = 3.906
99.9 = 3.291
99 = 2.575
95 = 1.96
90 = 1.645
85 = 1.44
80 = 1.28

98 = 2.33


  <Dropdown placeholder={ "?" } defaultValue={ 7 }  openOnFocus={ true } button simple item options={ options }

pqmethod = loading 'significant at p<.05'


.67	1.28	1.65	1.96	2.33	2.58	2.81	3.10	3.30	3.49	3.73	3.91

*/
