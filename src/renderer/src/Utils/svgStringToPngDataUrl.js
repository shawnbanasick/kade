// svgStringToPngDataUrl.js
export default function svgStringToPngDataUrl(svgString, { width, height, scale = 2 }) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = (e) => reject(new Error('Failed to load SVG for rasterizing'));

    // data URL (rather than blob URL) avoids tainted-canvas issues
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
  });
}
