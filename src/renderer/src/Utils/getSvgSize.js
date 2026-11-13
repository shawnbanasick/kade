// getSvgSize.js
export default function getSvgSize(el) {
  // 1. Explicit attributes (what FactorViz sets) - works even when hidden
  const attrW = parseFloat(el.getAttribute('width'));
  const attrH = parseFloat(el.getAttribute('height'));
  if (attrW > 0 && attrH > 0) return { width: attrW, height: attrH };

  // 2. viewBox
  const vb = el.viewBox?.baseVal;
  if (vb && vb.width > 0 && vb.height > 0) return { width: vb.width, height: vb.height };

  // 3. Rendered size (needs the element to be visible)
  const rect = el.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) return { width: rect.width, height: rect.height };

  // 4. Content bounding box
  try {
    const box = el.getBBox();
    if (box.width > 0 && box.height > 0) {
      return { width: box.x + box.width, height: box.y + box.height };
    }
  } catch (e) {
    // getBBox throws if the element isn't rendered
  }

  return null;
}
