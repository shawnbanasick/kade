import { default as currentDate } from "../../Utils/currentDate1";
import { default as currentTime } from "../../Utils/currentTime1";
import store from "../../store";

const downloadSvgImage = () => {
  let projectName = store.getState("projectName");
  let date = currentDate();
  let time = currentTime();
  let dateTime = date + " " + time;
  let completeFileName = projectName + "-scree_plot_" + dateTime;

  var svg = document.querySelector('#screePlot');

  function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {
      type: "image/svg+xml;charset=utf-8"
    });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  saveSvg(svg, completeFileName);
  return;
};

export default downloadSvgImage;
