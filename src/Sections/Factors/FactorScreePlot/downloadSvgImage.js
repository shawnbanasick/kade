import currentDate from "../../../Utils/currentDate1";
import currentTime from "../../../Utils/currentTime1";
import store from "../../../store";

const {dialog} = require("electron").remote;



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

function downloadSvgImage() {
  try {
    const projectName = store.getState("projectName");
    const date = currentDate();
    const time = currentTime();
    const dateTime = `${date} ${time}`;
    const completeFileName = `${projectName}-scree_plot_${dateTime}`;
    const svg = document.querySelector("#screePlot");

    saveSvg(svg, completeFileName);


  } catch (error) {
    dialog.showErrorBox("File Save Error", error.message);
  }
}

export default downloadSvgImage;
