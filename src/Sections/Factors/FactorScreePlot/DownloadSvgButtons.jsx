import React from "react";
import styled from "styled-components";
import downloadSvgImage from "./downloadSvgImage";
import downloadPngImage from "./downloadPngImage";

const DownloadSvgButtons = () => (
    <div style={ { display: "flex", height: 100, marginTop: 30 } }>
      <DownloadButton id="downloadSvgButtonScree" size={ "big" } style={ { marginRight: 5 } } onClick={ downloadSvgImage }>
        Download SVG
      </DownloadButton>
      <DownloadButton id="downloadPngButtonScree" size={ "big" } style={ { marginRight: 5 } } onClick={ downloadPngImage }>
        Download PNG
      </DownloadButton>
    </div>
);

export default DownloadSvgButtons;

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
    background-color: #abafb3;
  }

  &:active {
    box-shadow: 0 1px 1px 0 black;
    transform: translateY(1px);  
  }
`;
