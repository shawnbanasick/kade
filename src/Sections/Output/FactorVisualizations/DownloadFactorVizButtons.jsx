import React from "react";
import { Button } from "semantic-ui-react";
import { saveSvgAsPng } from "save-svg-as-png";
import store from "../../../store";
import { default as currentDate } from "../../../Utils/currentDate1";
import { default as currentTime } from "../../../Utils/currentTime1";

const downloadSvgImage = imageId => {
  const imageName = `#image${  imageId}`;
  const projectName = store.getState("projectName");
  const date = currentDate();
  const time = currentTime();
  const dateTime = `${date  }__${  time}`;
  const cleanFactorName = `${imageId  }__`;
  let config;
  const shouldAddName = store.getState("willAddCustomNameToDownload");
  const customName = store.getState("customDownloadFileNames");
  const customNameLocation = store.getState("customFileNameLocation");
  if (shouldAddName === true) {
    if (customNameLocation === "prepend") {
      config = {
        filename:
          `${customName 
          }__${ 
          projectName 
          }_${ 
          cleanFactorName 
          }__${ 
          dateTime}`
      };
    } else if (customNameLocation === "append") {
      config = {
        filename:
          `${projectName 
          }_${ 
          cleanFactorName 
          }__${ 
          dateTime 
          }__${ 
          customName}`
      };
    } else if (customNameLocation === "replace") {
      config = {
        filename: customName
      };
    } else {
      config = {
        filename: `${projectName  }_${  cleanFactorName  }__${  dateTime}`
      };
    }
  } else {
    config = {
      filename: `${projectName  }_${  cleanFactorName  }__${  dateTime}`
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
  const imageName = `image${  imageId}`;
  const projectName = store.getState("projectName");
  const date = currentDate();
  const time = currentTime();
  const dateTime = `${date  }__${  time}`;
  const shouldAddName = store.getState("willAddCustomNameToDownload");
  const customName = store.getState("customDownloadFileNames");
  const customNameLocation = store.getState("customFileNameLocation");
  const cleanFactorName = `${imageId  }__`;
  let nameConfig;

  if (shouldAddName === true) {
    if (customNameLocation === "prepend") {
      nameConfig =
        `${customName  }_${  projectName  }_${  cleanFactorName  }${dateTime}`;
    } else if (customNameLocation === "append") {
      nameConfig =
        `${projectName  }__${  cleanFactorName  }${dateTime  }_${  customName}`;
    } else if (customNameLocation === "replace") {
      nameConfig = customName;
    } else {
      nameConfig = `${projectName  }__${  cleanFactorName  }${dateTime}`;
    }
  } else {
    nameConfig = `${projectName  }__${  cleanFactorName  }${dateTime}`;
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
            id={`downloadSvgButtonFacViz${  this.props.id}`}
            size={"big"}
            onClick={() => downloadSvgImage(this.props.id)}
            style={{ marginRight: 5 }}
          >
            Download SVG
          </Button>
          <Button
            id={`downloadPngButtonFacViz${  this.props.id}`}
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
