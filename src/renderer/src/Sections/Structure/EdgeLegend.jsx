// Renders as pure SVG so it exports correctly with html-to-image
const EdgeLegend = () => {
  const items = [
    {
      label: 'Strong (r > .9)',
      strokeWidth: 3,
      strokeDasharray: null,
    },
    {
      label: 'Weak (r ≤ .9)',
      strokeWidth: 1.5,
      strokeDasharray: null,
    },
    {
      label: 'Negative (r < 0)',
      strokeWidth: 1.5,
      strokeDasharray: '6 3',
    },
  ];

  const lineLength = 36;
  const rowHeight = 22;
  const paddingX = 12;
  const paddingY = 10;
  const textOffset = lineLength + 10;
  const width = 155;
  const height = items.length * rowHeight + paddingY * 2 + 12;

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {/* Background rect */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="white"
        stroke="#cccccc"
        strokeWidth={1}
        rx={4}
      />

      {/* Title */}
      <text
        x={paddingX + 15}
        y={paddingY + 4}
        style={{ fontSize: 11, fontFamily: 'sans-serif', fontWeight: 'bold', fill: '#333' }}
        dominantBaseline="hanging"
      >
        Correlation Links
      </text>

      {/* Legend rows */}
      {items.map((item, i) => {
        const y = paddingY + 32 + i * rowHeight;
        return (
          <g key={item.label}>
            {/* Arrowhead marker defined inline per row */}
            <defs>
              <marker
                id={`legend-arrow-${i}`}
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L6,3 z" fill="black" />
              </marker>
            </defs>
            <line
              x1={paddingX}
              y1={y}
              x2={paddingX + lineLength}
              y2={y}
              stroke="black"
              strokeWidth={item.strokeWidth}
              strokeDasharray={item.strokeDasharray || undefined}
              markerEnd={`url(#legend-arrow-${i})`}
            />
            <text
              x={paddingX + textOffset}
              y={y}
              dominantBaseline="middle"
              style={{ fontSize: 10, fontFamily: 'sans-serif', fill: '#333' }}
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default EdgeLegend;
