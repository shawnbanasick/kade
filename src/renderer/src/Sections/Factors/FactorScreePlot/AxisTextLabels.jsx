import React from "react";
import { useTranslation } from "react-i18next";

const AxisTextLables = () => {
  const { t } = useTranslation();

  return (
    <g>
      <text
        id="yAxisTitle"
        fontFamily="arial"
        x={-210}
        y={-7}
        transform={"rotate(270 90,50)"}
      >
        {t("Eigenvalues")}
      </text>
      <text id="xAxisTitle" fontFamily="arial" x={300} y={590}>
        {t("Factor Number")}
      </text>
    </g>
  );
};

export default AxisTextLables;
