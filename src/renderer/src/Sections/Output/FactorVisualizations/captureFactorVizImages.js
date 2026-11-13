// captureFactorVizImages.js
import serializeSvg from '../../../Utils/serializeSVG';
import svgStringToPngDataUrl from '../../../Utils/svgStringToPngBytes';
import getSvgSize from '../../../Utils/getSvgSize';

export default async function captureFactorVizImages({ scale = 2 } = {}) {
  const svgEls = Array.from(document.querySelectorAll('svg.vizImage'));

  const entries = (
    await Promise.all(
      svgEls.map(async (el) => {
        const size = getSvgSize(el);
        if (!size) {
          console.warn(`Skipping ${el.id}: could not determine size`);
          return null;
        }
        const { width, height } = size;
        const svg = serializeSvg(el, { width, height });
        const png = await svgStringToPngDataUrl(svg, { width, height, scale });
        return [el.id, { svg, png, width, height, updatedAt: Date.now() }];
      })
    )
  ).filter(Boolean);

  return Object.fromEntries(entries); // keyed by `image${id}`
}
