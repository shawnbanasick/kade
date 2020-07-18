import styled from "styled-components";
import { view } from "react-easy-state";
import React from "react";
import UserNumberInput from "./UserNumberInput";
import UserSelectionSwitch from "./UserSelectionSwitch";
import { useTranslation } from "react-i18next";

const styles = {
  width: 150
};

const StatementsSettingsPanel = () => {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: 30 }}>
      <span style={{ fontSize: 22, userSelect: "none" }}>
        {t("Statements")}
      </span>
      <hr style={{ width: "100%", marginBottom: 15 }} />
      <OptionStatementRow>
        <OptionStatementText>{`8. ${t(
          "Adjust line spacing"
        )}?`}</OptionStatementText>
        <UserSelectionSwitch
          name="willAdjustLineSpacing"
          value="willAdjustLineSpacing"
          toggle={false}
        />
        <div style={styles}>
          <UserNumberInput
            name={"willAdjustLineSpacingBy"}
            step="0.1"
            lowerLimit={0.1}
            upperLimit={10.0}
            value={1.4}
          />
        </div>
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`9. ${t(
          "Adjust top margin"
        )}?`}</OptionStatementText>
        <UserSelectionSwitch
          name="willAdjustTopMargin"
          value="willAdjustTopMargin"
          toggle={false}
        />
        <div style={styles}>
          <UserNumberInput
            name={"willAdjustTopMarginBy"}
            lowerLimit={5}
            upperLimit={80}
            value={15}
          />
        </div>
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>
          {`10. ${t("Limit number of lines to prevent overflow")}?`}
        </OptionStatementText>
        <UserSelectionSwitch
          name="willTrimStatement"
          value="willTrimStatement"
          toggle
        />
        <OptionStatementText>{`${t("max num lines")} =  `}</OptionStatementText>
        <div style={styles}>
          <UserNumberInput
            name={"willTrimStatementBy"}
            lowerLimit={1}
            upperLimit={20}
            value={5}
          />
        </div>
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`11. ${t(
          "Adjust statement width"
        )}?`}</OptionStatementText>
        <UserSelectionSwitch
          name="willAdjustStatementWidth"
          value="willAdjustStatementWidth"
          toggle={false}
        />
        <div style={styles}>
          <UserNumberInput
            name={"willAdjustStatementWidthBy"}
            lowerLimit={5}
            upperLimit={200}
            value={15}
          />
        </div>
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>
          {`12. (${t("Asian languages only")}) ${t(
            "Adjust width of statement rows"
          )}?`}
        </OptionStatementText>
        <UserSelectionSwitch
          name="willAdjustWidthAsian"
          value="willAdjustWidthAsian"
          toggle={false}
        />
        <div style={styles}>
          <UserNumberInput
            name={"willAdjustWidthAsianBy"}
            lowerLimit={1}
            upperLimit={200}
            value={12}
          />
        </div>
      </OptionStatementRow>
    </div>
  );
};

export default view(StatementsSettingsPanel);

const OptionStatementRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding-left: 10px;
`;

const OptionStatementText = styled.div`
  font-size: 16px;
  user-select: none;
`;
