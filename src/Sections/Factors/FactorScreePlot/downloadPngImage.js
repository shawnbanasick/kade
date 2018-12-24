import { saveSvgAsPng } from "save-svg-as-png";
import store from "../../../store";

const downloadPngImage = () => {
  const projectName = store.getState("projectName");
  const filename = `${projectName}_scree_plot`;

  saveSvgAsPng(document.getElementById("screePlot"), filename, {
    encoderOptions: 1
  });
};

export default downloadPngImage;
