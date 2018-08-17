import React from "react";
import store from "../../store";
import { Button } from "semantic-ui-react";
import { saveSvgAsPng } from "save-svg-as-png";
import { default as currentDate } from "../../Utils/currentDate1";
import { default as currentTime } from "../../Utils/currentTime1";

const downloadSvgImage = imageId => {
  let imageName = "#image" + imageId;
  let projectName = store.getState("projectName");
  let date = currentDate();
  let time = currentTime();
  let dateTime = date + "__" + time;
  let cleanFactorName = imageId + "__";
  let config;
  let shouldAddName = store.getState("willAddCustomNameToDownload");
  let customName = store.getState("customDownloadFileNames");
  let customNameLocation = store.getState("customFileNameLocation");
  if (shouldAddName === true) {
    if (customNameLocation === "prepend") {
      config = {
        filename:
          customName +
          "__" +
          projectName +
          "_" +
          cleanFactorName +
          "__" +
          dateTime
      };
    } else if (customNameLocation === "append") {
      config = {
        filename:
          projectName +
          "_" +
          cleanFactorName +
          "__" +
          dateTime +
          "__" +
          customName
      };
    } else if (customNameLocation === "replace") {
      config = {
        filename: customName
      };
    } else {
      config = {
        filename: projectName + "_" + cleanFactorName + "__" + dateTime
      };
    }
  } else {
    config = {
      filename: projectName + "_" + cleanFactorName + "__" + dateTime
    };
  }

  var svg = document.querySelector(imageName);

  // https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-
  // creating-an-svg-with-d3-js-ie-safari-an
  function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {
      type: "image/svg+xml;charset=utf-8"
    });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  saveSvg(svg, config.filename);
};

const downloadFacVizAsPng = imageId => {
  let imageName = "image" + imageId;
  let projectName = store.getState("projectName");
  let date = currentDate();
  let time = currentTime();
  let dateTime = date + "__" + time;
  let shouldAddName = store.getState("willAddCustomNameToDownload");
  let customName = store.getState("customDownloadFileNames");
  let customNameLocation = store.getState("customFileNameLocation");
  let cleanFactorName = imageId + "__";
  let nameConfig;

  if (shouldAddName === true) {
    if (customNameLocation === "prepend") {
      nameConfig =
        customName + "_" + projectName + "_" + cleanFactorName + dateTime;
    } else if (customNameLocation === "append") {
      nameConfig =
        projectName + "__" + cleanFactorName + dateTime + "_" + customName;
    } else if (customNameLocation === "replace") {
      nameConfig = customName;
    } else {
      nameConfig = projectName + "__" + cleanFactorName + dateTime;
    }
  } else {
    nameConfig = projectName + "__" + cleanFactorName + dateTime;
  }
  saveSvgAsPng(document.getElementById(imageName), nameConfig, {
    encoderOptions: 1
  });
};

class DownloadFactorVizButtons extends React.Component {
  render() {
    return (
      <div>
        <Button.Group floated="left">
          <Button
            id={"downloadSvgButtonFacViz" + this.props.id}
            size={"big"}
            onClick={() => downloadSvgImage(this.props.id)}
            style={{ marginRight: 5 }}
          >
            Download SVG
          </Button>
          <Button
            id={"downloadPngButtonFacViz" + this.props.id}
            onClick={() => downloadFacVizAsPng(this.props.id)}
            size={"big"}
          >
            Download PNG
          </Button>
        </Button.Group>
      </div>
    );
  }
}
export default DownloadFactorVizButtons;
