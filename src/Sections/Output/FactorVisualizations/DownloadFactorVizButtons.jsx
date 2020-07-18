import React from "react";
import { saveSvgAsPng } from "save-svg-as-png";
import currentDate from "../../../Utils/currentDate1";
import currentTime from "../../../Utils/currentTime1";
import vizState from "../../GlobalState/vizState";
import coreState from "../../GlobalState/coreState";
import GeneralButton from "../../../Utils/GeneralButton";
import { useTranslation } from "react-i18next";

const clone = require("rfdc")();

const downloadSvgImage = imageId => {
  const factorVizOptions = clone(vizState.factorVizOptions);
  const shouldAddName = factorVizOptions.willAddCustomNameToDownload;
  const imageName = `#image${imageId}`;
  const projectName = coreState.projectName;
  const date = currentDate();
  const time = currentTime();
  const dateTime = `${date}_${time}`;
  const cleanFactorName = `${imageId}`;
  let config;
  const customName = factorVizOptions.customDownloadFileNames;
  const customNameLocation = factorVizOptions.customFileNameLocation;
  if (shouldAddName === true) {
    if (customNameLocation === "prepend") {
      config = {
        filename: `${customName}_${projectName}_${cleanFactorName}_${dateTime}`
      };
    } else if (customNameLocation === "append") {
      config = {
        filename: `${projectName}_${cleanFactorName}_${dateTime}_${customName}`
      };
    } else if (customNameLocation === "replace") {
      config = {
        filename: customName
      };
    } else {
      config = {
        filename: `${projectName}_${cleanFactorName}_${dateTime}`
      };
    }
  } else {
    config = {
      filename: `${projectName}_${cleanFactorName}_${dateTime}`
    };
  }

  const svg = document.querySelector(imageName);

  // https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-
  // creating-an-svg-with-d3-js-ie-safari-an
  function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const svgData = svgEl.outerHTML;
    const preface = '<?xml version="1.0" standalone="no"?>\r\n';
    const svgBlob = new Blob([preface, svgData], {
      type: "image/svg+xml;charset=utf-8"
    });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  saveSvg(svg, config.filename);
};

const downloadFacVizAsPng = imageId => {
  // getState
  const factorVizOptions = clone(vizState.factorVizOptions);
  const shouldAddName = factorVizOptions.willAddCustomNameToDownload;

  const imageName = `image${imageId}`;
  const projectName = coreState.projectName;
  const date = currentDate();
  const time = currentTime();
  const dateTime = `${date}__${time}`;
  const customName = factorVizOptions.customDownloadFileNames;
  const customNameLocation = factorVizOptions.customFileNameLocation;
  const cleanFactorName = `${imageId}__`;
  let nameConfig;

  if (shouldAddName === true) {
    if (customNameLocation === "prepend") {
      nameConfig = `${customName}_${projectName}_${cleanFactorName}${dateTime}`;
    } else if (customNameLocation === "append") {
      nameConfig = `${projectName}__${cleanFactorName}${dateTime}_${customName}`;
    } else if (customNameLocation === "replace") {
      nameConfig = customName;
    } else {
      nameConfig = `${projectName}__${cleanFactorName}${dateTime}`;
    }
  } else {
    nameConfig = `${projectName}__${cleanFactorName}${dateTime}`;
  }
  saveSvgAsPng(document.getElementById(imageName), nameConfig, {
    encoderOptions: 1
  });
};

const DownloadFactorVizButtons = props => {
  const { t } = useTranslation();

  return (
    <div style={{ display: "flex" }}>
      <GeneralButton
        id={`downloadSvgButtonFacViz${props.id}`}
        onClick={() => downloadSvgImage(props.id)}
        style={{ marginRight: 5, marginLeft: 20 }}
      >
        {t("Download SVG")}
      </GeneralButton>
      <GeneralButton
        id={`downloadPngButtonFacViz${props.id}`}
        onClick={() => downloadFacVizAsPng(props.id)}
      >
        {t("Download PNG")}
      </GeneralButton>
    </div>
  );
};
export default DownloadFactorVizButtons;
