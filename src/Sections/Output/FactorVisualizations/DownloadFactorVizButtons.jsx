import React from "react";
// import { Button } from "semantic-ui-react";
import styled from "styled-components";
import { saveSvgAsPng } from "save-svg-as-png";
import state from "../../../store";
import currentDate from "../../../Utils/currentDate1";
import currentTime from "../../../Utils/currentTime1";

const downloadSvgImage = imageId => {
  const factorVizOptions = state.getState("factorVizOptions");
  const shouldAddName = factorVizOptions.willAddCustomNameToDownload;
  const imageName = `#image${imageId}`;
  const projectName = state.getState("projectName");
  const date = currentDate();
  const time = currentTime();
  const dateTime = `${date}__${time}`;
  const cleanFactorName = `${imageId}__`;
  let config;
  const customName = factorVizOptions.customDownloadFileNames;
  const customNameLocation = factorVizOptions.customFileNameLocation;
  if (shouldAddName === true) {
    if (customNameLocation === "prepend") {
      config = {
        filename: `${customName}__${projectName}_${cleanFactorName}__${dateTime}`
      };
    } else if (customNameLocation === "append") {
      config = {
        filename: `${projectName}_${cleanFactorName}__${dateTime}__${customName}`
      };
    } else if (customNameLocation === "replace") {
      config = {
        filename: customName
      };
    } else {
      config = {
        filename: `${projectName}_${cleanFactorName}__${dateTime}`
      };
    }
  } else {
    config = {
      filename: `${projectName}_${cleanFactorName}__${dateTime}`
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
  const factorVizOptions = state.getState("factorVizOptions");
  const shouldAddName = factorVizOptions.willAddCustomNameToDownload;

  const imageName = `image${imageId}`;
  const projectName = state.getState("projectName");
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

class DownloadFactorVizButtons extends React.Component {
  render() {
    return (
      <div style={ { display: "flex" } }>
        <DownloadButton id={ `downloadSvgButtonFacViz${this.props.id}` } onClick={ () => downloadSvgImage(this.props.id) } style={ { marginRight: 5 } }>
          Download SVG
        </DownloadButton>
        <DownloadButton id={ `downloadPngButtonFacViz${this.props.id}` } onClick={ () => downloadFacVizAsPng(this.props.id) }>
          Download PNG
        </DownloadButton>
      </div>
      );
  }
}
export default DownloadFactorVizButtons;

const DownloadButton = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 40px;
  width: 195px;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-bottom: 3px;
  margin-right: 15px;
  box-shadow: 0 2px 2px 0 black;
  outline: none;
  user-select: none;

  &:hover {
    font-weight: bold
  }

  &:active {
    box-shadow: 0 1px 1px 0 black;
    transform: translateY(1px);  
  }
`;

// import styled, { keyframes } from "styled-components";
