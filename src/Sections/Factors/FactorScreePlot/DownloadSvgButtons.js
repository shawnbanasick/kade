import React from "react";
// import { Button } from "semantic-ui-react";
import downloadSvgImage from "./downloadSvgImage";
import downloadPngImage from "./downloadPngImage";

const DownloadSvgButtons = () => (
  <div style={{ height: 100, marginTop: 30 }}>
    <button
      id="downloadSvgButtonScree"
      size={"big"}
      style={{ marginRight: 5 }}
      onClick={downloadSvgImage}
    >
      Download SVG
    </button>
    <button
      id="downloadPngButtonScree"
      size={"big"}
      style={{ marginRight: 5 }}
      onClick={downloadPngImage}
    >
      Download PNG
    </button>
  </div>
);

export default DownloadSvgButtons;
