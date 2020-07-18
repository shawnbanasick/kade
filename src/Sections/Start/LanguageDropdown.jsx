import React from "react";
// import { toast } from "react-toastify";
import { Dropdown } from "semantic-ui-react";
import { view } from "react-easy-state";
import i18n from "i18next";

const options = [
  {
    key: "language1",
    text: "English",
    value: "en"
  },
  {
    key: "language2",
    text: "Japanese",
    value: "jp"
  }
];

const languageDropdown = props => {
  const changeLanguage = (event, data) => {
    console.log(data.value);
    i18n.changeLanguage(data.value);
  };

  return (
    <Dropdown
      placeholder={"Select User Interface Language"}
      onChange={changeLanguage}
      openOnFocus
      scrolling
      button
      options={options}
    />
  );
};

export default view(languageDropdown);
