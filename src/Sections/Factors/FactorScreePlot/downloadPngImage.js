import { saveSvgAsPng } from "save-svg-as-png";
import state from "../../../store";
import currentDate from "../../../Utils/currentDate1";
import currentTime from "../../../Utils/currentTime1";


const downloadPngImage = () => {
  const projectName = state.getState("projectName");
  const date = currentDate();
  const time = currentTime();
  const dateTime = `${date} ${time}`;
  const filename = `${projectName}-scree_plot_${dateTime}`;

  saveSvgAsPng(document.getElementById("screePlot"), filename, {
    encoderOptions: 1
  });
};

export default downloadPngImage;
