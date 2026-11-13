// captureFactorVizImages.js
import serializeSvg from '../../../Utils/serializeSVG';
import svgStringToPngDataUrl from '../../../Utils/svgStringToPngDataUrl';
import getSvgSize from '../../../Utils/getSvgSize';
import buildDrawioXmlFacViz from '../FactorVisualizations/buildDrawioXml';

export default async function captureFactorVizImages({ scale = 2 } = {}, dispatchProps = []) {
  const svgEls = Array.from(document.querySelectorAll('svg.vizImage'));

  const entries = (
    await Promise.all(
      svgEls.map(async (el, index) => {
        const size = getSvgSize(el);
        if (!size) {
          console.warn(`Skipping ${el.id}: could not determine size`);
          return null;
        }
        const { width, height } = size;
        const svg = serializeSvg(el, { width, height });
        const png = await svgStringToPngDataUrl(svg, { width, height, scale });
        const drawio = buildDrawioXmlFacViz(
          dispatchProps[index].data,
          dispatchProps[index].positionData,
          dispatchProps[index].factorVizOptions
        );
        return [el.id, { svg, png, drawio, width, height, updatedAt: Date.now() }];
      })
    )
  ).filter(Boolean);

  return Object.fromEntries(entries); // keyed by `image${id}`
}
