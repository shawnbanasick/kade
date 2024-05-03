import React from "react";
import { withWindowSizeListener } from "react-window-size-listener";
import App from "./App";

const WindowResizer = () => {
  return (
    <App
      width={this.props.windowSize.windowWidth}
      height={this.props.windowSize.windowHeight}
    />
  );
};

export default withWindowSizeListener(WindowResizer);
