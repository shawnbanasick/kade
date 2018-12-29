const svgString2Image = (svgString, width, height, format, callback) => {
  format = format || "png";
  const imgsrc =
    `data:image/svg+xml;base64,${ 
    btoa(unescape(encodeURIComponent(svgString)))}`; // Convert SVG string to data URL
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  const image = new Image();
  image.onload = () => {
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);
    canvas.toBlob(blob => {
      const filesize = `${Math.round(blob.length / 1024)  } KB`;
      if (callback) callback(blob, filesize);
    });
  };
  image.src = imgsrc;
};

export default svgString2Image;
