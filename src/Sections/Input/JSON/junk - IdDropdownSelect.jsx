// import store from "../../../store";
import React, { Component } from "react";
// import { view } from "react-easy-state";
// import displayJsonData from "./displayJsonData";
// // import "./IdDropdownSelect.css";
// import Select from "react-styled-select";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

class IdDropdownSelect extends Component {
  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

//   state = {};

//   handleChange = (e, { value }) => {
//     let selection = {
//       value
//     };
//     displayJsonData(selection);
//     this.setState({
//       value
//     });
//   };

//   render() {
//     const options = [{ label: "One", value: 1 }, { label: "Two", value: 2 }];
//     return (
//       <Select
//         options={options}
//         onOpen={myOpenFunc}
//         onChange={myChangeFunc}
//         classes={{
//           selectValue: "my-custom-value",
//           selectArrow: "my-custom-arrow"
//         }}
//       />
//     );
//   }

//   render() {
//     // const options = store.getState("jsonParticipantId");

//     const options = [{ label: "One", value: 1 }, { label: "Two", value: 2 }];

//     const { value } = this.state;

//     return (
//       <Select
//         fluid
//         onChange={this.handleChange}
//         options={options}
//         placeholder="Select id"
//         selection
//         value={value}
//         classes={{
//           selectValue: "my-custom-value",
//           selectArrow: "my-custom-arrow"
//         }}
//       />
//     );
//   }

export default view(IdDropdownSelect);
