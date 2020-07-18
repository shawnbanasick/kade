import { saveSvgAsPng } from "save-svg-as-png";
import currentDate from "../../../Utils/currentDate1";
import currentTime from "../../../Utils/currentTime1";

import coreState from '../../GlobalState/coreState';

const downloadPngImage = () => {
  // getState
  const projectName = coreState.projectName;
  const date = currentDate();
  const time = currentTime();
  const dateTime = `${date} ${time}`;
  const filename = `${projectName}-scree_plot_${dateTime}`;

  saveSvgAsPng(document.getElementById("screePlot"), filename, {
    encoderOptions: 1
  });
};

export default downloadPngImage;
