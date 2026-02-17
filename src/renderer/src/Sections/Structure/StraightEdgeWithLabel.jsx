import { getStraightPath } from 'reactflow';

// A custom edge that renders its label as a native SVG <text> element
// instead of a <foreignObject> div — this exports cleanly to SVG.
const StraightEdgeWithLabel = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
  style,
  markerEnd,
  labelY = 0,
}) => {
  const [edgePath, labelX, labelCenterY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const textY = labelCenterY + labelY;

  return (
    <>
      {/* Invisible wide stroke for easier clicking */}
      <path id={id} d={edgePath} fill="none" stroke="transparent" strokeWidth={20} />
      {/* Visible styled stroke */}
      <path d={edgePath} fill="none" style={style} markerEnd={markerEnd} />
      {label && (
        <g transform={`translate(${labelX}, ${textY})`}>
          {/* White background rect behind the text */}
          <rect x={-14} y={-8} width={28} height={14} fill="white" fillOpacity={1} rx={2} />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: 10,
              fill: '#000000',
              fontFamily: 'sans-serif',
              pointerEvents: 'none',
            }}
          >
            {label}
          </text>
        </g>
      )}
    </>
  );
};

export default StraightEdgeWithLabel;
