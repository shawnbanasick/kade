import React from "react";
import { view } from "react-easy-state";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const TranslationAttribution = () => {
  const { t } = useTranslation();

  return (
    <TranslationAttContainer>
      {`${t("Translation")}  ${t("translator")}`}
    </TranslationAttContainer>
  );
};

export default view(TranslationAttribution);

const TranslationAttContainer = styled.div`
  display: flex;
  height: 22px;
  font-size: 20px;
  grid-area: translation;
`;
