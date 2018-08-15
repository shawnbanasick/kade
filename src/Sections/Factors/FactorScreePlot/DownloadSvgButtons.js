import React from "react";
import { Button } from "semantic-ui-react";
import downloadSvgImage from "./downloadSvgImage";
import downloadPngImage from "./downloadPngImage";

const DownloadSvgButtons = () => (
  <div style={{ height: 100, marginTop: 30 }}>
    <Button.Group floated="right">
      <Button
        id="downloadSvgButtonScree"
        size={"big"}
        style={{ marginRight: 5 }}
        onClick={downloadSvgImage}
      >
        Download SVG
      </Button>
      <Button
        id="downloadPngButtonScree"
        size={"big"}
        style={{ marginRight: 5 }}
        onClick={downloadPngImage}
      >
        Download PNG
      </Button>
    </Button.Group>
  </div>
);

export default DownloadSvgButtons;
