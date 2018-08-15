import store from "../../store";
import { saveSvgAsPng } from "save-svg-as-png";

const downloadPngImage = () => {
  let projectName = store.getState("projectName");
  let filename = projectName + "_scree_plot";

  saveSvgAsPng(document.getElementById("screePlot"), filename, {
    encoderOptions: 1
  });

  return;
};

export default downloadPngImage;
