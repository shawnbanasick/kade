import styled from "styled-components";
import { view } from "react-easy-state";
import React from "react";
import UserNumberInput from "./UserNumberInput";
import UserSelectionSwitch from "./UserSelectionSwitch";
import { useTranslation } from "react-i18next";

const styles = {
  width: 150
};

const CardSettingsPanel = () => {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: 30 }}>
      <span style={{ fontSize: 22, userSelect: "none" }}>{t("Cards")}</span>
      <hr style={{ width: "100%", marginBottom: 15 }} />
      <OptionStatementRow>
        <OptionStatementText>{`5. ${t(
          "Adjust card height"
        )}?`}</OptionStatementText>
        <UserSelectionSwitch
          name="willAdjustCardHeight"
          value="willAdjustCardHeight"
          toggle={false}
        />
        <div style={styles}>
          <UserNumberInput
            name={"willAdjustCardHeightBy"}
            lowerLimit={15}
            upperLimit={500}
            value={110}
          />
        </div>
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`6. ${t(
          "Adjust card width"
        )}?`}</OptionStatementText>
        <UserSelectionSwitch
          name="willAdjustCardWidth"
          value="willAdjustCardWidth"
          toggle={false}
        />
        <div style={styles}>
          <UserNumberInput
            name={"willAdjustCardWidthBy"}
            lowerLimit={15}
            upperLimit={500}
            value={110}
          />
        </div>
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`7. ${t(
          "Adjust font size"
        )}?`}</OptionStatementText>
        <UserSelectionSwitch
          name="willAdjustCardFontSize"
          value="willAdjustCardFontSize"
          toggle={false}
        />
        <div style={styles}>
          <UserNumberInput
            name={"willAdjustCardFontSizeBy"}
            lowerLimit={5}
            upperLimit={80}
            value={13}
          />
        </div>
      </OptionStatementRow>
    </div>
  );
};

export default view(CardSettingsPanel);

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

// import styled from "styled-components";
