export default function serializeSvg(svgEl) {
  const clone = svgEl.cloneNode(true);

  // Make sure namespaces exist so the file opens standalone
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

  // Ensure explicit size (needed for rasterizing)
  const { width, height } = svgEl.getBoundingClientRect();
  clone.setAttribute('width', width);
  clone.setAttribute('height', height);

  // Optional: add a white background, since PNG would otherwise be transparent
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('width', '100%');
  bg.setAttribute('height', '100%');
  bg.setAttribute('fill', '#fff');
  clone.insertBefore(bg, clone.firstChild);

  return new XMLSerializer().serializeToString(clone);
}
