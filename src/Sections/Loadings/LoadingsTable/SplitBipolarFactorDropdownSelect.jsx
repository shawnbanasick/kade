import React from "react";
import { view } from "react-easy-state";
import { Dropdown } from "semantic-ui-react";
import loadingState from "../../GlobalState/loadingState";
import rotationState from "../../GlobalState/rotationState";
import { useTranslation } from "react-i18next";

const saveDropdownValueToState = (event, data) => {
  const factorToSplit = data.value;
  loadingState.factorToSplit = factorToSplit;
};

const InvertFactorDropdownSelect = () => {
  const { t } = useTranslation();

  const getOptions = () => {
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
    const numFactorsKeptForRot = rotationState.numFactorsKeptForRot;
    options.length = +numFactorsKeptForRot;

    return options;
  };

  const options = getOptions();
  return (
    <div style={{ display: "flex" }}>
      <span style={{ marginRight: 20, fontSize: 30 }}>
        {`${t("Select the factor to split")}: `}
      </span>
      <Dropdown
        placeholder={"?"}
        onChange={saveDropdownValueToState}
        openOnFocus
        button
        simple
        item
        options={options}
      />
    </div>
  );
};

export default view(InvertFactorDropdownSelect);
