import { default as getCSSStyles } from "./getCssStyles";
import { default as appendCSS } from "./appendCss";

const getSvgString = svgNode => {
    svgNode.setAttribute("xlink", "http://www.w3.org/1999/xlink");
    let cssStyleText = getCSSStyles(svgNode);
    appendCSS(cssStyleText, svgNode);

    let serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgNode);
    svgString = svgString.replace(/(\w+)?:?xlink=/g, "xmlns:xlink="); // Fix root xlink without namespace
    svgString = svgString.replace(/NS\d+:href/g, "xlink:href"); // Safari NS namespace fix

    return svgString;
};

export default getSvgString;
