import { saveSvgAsPng } from "save-svg-as-png";
import currentDate from "../../../Utils/currentDate1";
import currentTime from "../../../Utils/currentTime1";
import getCoreState from "../../GlobalState/getCoreState";

const downloadPngImage = () => {
  // getState
  const projectName = getCoreState("projectName");
  const date = currentDate();
  const time = currentTime();
  const dateTime = `${date} ${time}`;
  const filename = `${projectName}-scree_plot_${dateTime}`;

  saveSvgAsPng(document.getElementById("screePlot"), filename, {
    encoderOptions: 1
  });
};

export default downloadPngImage;
