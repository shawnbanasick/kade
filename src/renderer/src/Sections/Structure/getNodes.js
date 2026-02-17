const getNodes = (
  labelObj,
  widthObj,
  paddingTopVal,
  heightVal,
  horizontalSpacing = 210,
  verticalSpacing = 125
) => {
  // Vertical positions for each row — evenly spaced by verticalSpacing, with
  // the first row offset fixed at 100px so the top node has breathing room.
  const firstRowOffset = 100;
  const rowSpacing = {
    row12: firstRowOffset,
    row23: firstRowOffset + verticalSpacing,
    row34: firstRowOffset + verticalSpacing * 2,
    row45: firstRowOffset + verticalSpacing * 3,
    row56: firstRowOffset + verticalSpacing * 4,
    row67: firstRowOffset + verticalSpacing * 5,
    row78: firstRowOffset + verticalSpacing * 6,
  };

  // Each row's nodes are evenly spaced by horizontalSpacing.
  // Row 1 is centered; rows 2+ start from x=0 and step by horizontalSpacing.
  // The offsets below preserve the relative centering from your original xObj.
  const s = horizontalSpacing; // shorthand

  const xObj = {
    // Row 1 (1 node) — centered over row 2's midpoint
    // x11: Math.round(s * 0.5),
    x11: 0,

    // Row 2 (2 nodes)
    x21: 0,
    x22: s,

    // Row 3 (3 nodes)
    x31: 0,
    x32: s,
    x33: s * 2,

    // Row 4 (4 nodes)
    x41: 0,
    x42: s,
    x43: s * 2,
    x44: s * 3,

    // Row 5 (5 nodes)
    x51: 0,
    x52: s,
    x53: s * 2,
    x54: s * 3,
    x55: s * 4,

    // Row 6 (6 nodes)
    x61: 0,
    x62: s,
    x63: s * 2,
    x64: s * 3,
    x65: s * 4,
    x66: s * 5,

    // Row 7 (7 nodes)
    x71: 0,
    x72: s,
    x73: s * 2,
    x74: s * 3,
    x75: s * 4,
    x76: s * 5,
    x77: s * 6,

    // Row 8 (8 nodes)
    x81: 0,
    x82: s,
    x83: s * 2,
    x84: s * 3,
    x85: s * 4,
    x86: s * 5,
    x87: s * 6,
    x88: s * 7,
  };

  const initialNodes = [
    {
      id: `${labelObj.label11}`,
      data: { label: '1/1' },
      position: { x: xObj.x11, y: 0 },
      type: 'input',
      style: {
        width: widthObj.width11,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '2-1',
      data: { label: '2/1' },
      position: { x: xObj.x21, y: rowSpacing.row12 },
      style: {
        width: widthObj.width21,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '2-2',
      data: { label: '2/2' },
      position: { x: xObj.x22, y: rowSpacing.row12 },
      style: {
        width: widthObj.width22,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '3-1',
      data: { label: '3/1' },
      position: { x: xObj.x31, y: rowSpacing.row23 },
      style: {
        width: widthObj.width31,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '3-2',
      data: { label: '3/2' },
      position: { x: xObj.x32, y: rowSpacing.row23 },
      style: {
        width: widthObj.width32,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '3-3',
      data: { label: '3/3' },
      position: { x: xObj.x33, y: rowSpacing.row23 },
      style: {
        width: widthObj.width33,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '4-1',
      data: { label: '4/1' },
      position: { x: xObj.x41, y: rowSpacing.row34 },
      style: {
        width: widthObj.width41,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '4-2',
      data: { label: '4/2' },
      position: { x: xObj.x42, y: rowSpacing.row34 },
      style: {
        width: widthObj.width42,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '4-3',
      data: { label: '4/3' },
      position: { x: xObj.x43, y: rowSpacing.row34 },
      style: {
        width: widthObj.width43,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '4-4',
      data: { label: '4/4' },
      position: { x: xObj.x44, y: rowSpacing.row34 },
      style: {
        width: widthObj.width44,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '5-1',
      data: { label: '5/1' },
      position: { x: xObj.x51, y: rowSpacing.row45 },
      style: {
        width: widthObj.width51,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '5-2',
      data: { label: '5/2' },
      position: { x: xObj.x52, y: rowSpacing.row45 },
      style: {
        width: widthObj.width52,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '5-3',
      data: { label: '5/3' },
      position: { x: xObj.x53, y: rowSpacing.row45 },
      style: {
        width: widthObj.width53,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '5-4',
      data: { label: '5/4' },
      position: { x: xObj.x54, y: rowSpacing.row45 },
      style: {
        width: widthObj.width54,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '5-5',
      data: { label: '5/5' },
      position: { x: xObj.x55, y: rowSpacing.row45 },
      style: {
        width: widthObj.width55,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '6-1',
      data: { label: '6/1' },
      position: { x: xObj.x61, y: rowSpacing.row56 },
      style: {
        width: widthObj.width61,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '6-2',
      data: { label: '6/2' },
      position: { x: xObj.x62, y: rowSpacing.row56 },
      style: {
        width: widthObj.width62,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '6-3',
      data: { label: '6/3' },
      position: { x: xObj.x63, y: rowSpacing.row56 },
      style: {
        width: widthObj.width63,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '6-4',
      data: { label: '6/4' },
      position: { x: xObj.x64, y: rowSpacing.row56 },
      style: {
        width: widthObj.width64,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '6-5',
      data: { label: '6/5' },
      position: { x: xObj.x65, y: rowSpacing.row56 },
      style: {
        width: widthObj.width65,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '6-6',
      data: { label: '6/6' },
      position: { x: xObj.x66, y: rowSpacing.row56 },
      style: {
        width: widthObj.width66,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '7-1',
      data: { label: '7/1' },
      position: { x: xObj.x71, y: rowSpacing.row67 },
      style: {
        width: widthObj.width71,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '7-2',
      data: { label: '7/2' },
      position: { x: xObj.x72, y: rowSpacing.row67 },
      style: {
        width: widthObj.width72,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '7-3',
      data: { label: '7/3' },
      position: { x: xObj.x73, y: rowSpacing.row67 },
      style: {
        width: widthObj.width73,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '7-4',
      data: { label: '7/4' },
      position: { x: xObj.x74, y: rowSpacing.row67 },
      style: {
        width: widthObj.width74,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '7-5',
      data: { label: '7/5' },
      position: { x: xObj.x75, y: rowSpacing.row67 },
      style: {
        width: widthObj.width75,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '7-6',
      data: { label: '7/6' },
      position: { x: xObj.x76, y: rowSpacing.row67 },
      style: {
        width: widthObj.width76,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '7-7',
      data: { label: '7/7' },
      position: { x: xObj.x77, y: rowSpacing.row67 },
      style: {
        width: widthObj.width77,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '8-1',
      data: { label: '8/1' },
      position: { x: xObj.x81, y: rowSpacing.row78 },
      style: {
        width: widthObj.width81,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '8-2',
      data: { label: '8/2' },
      position: { x: xObj.x82, y: rowSpacing.row78 },
      style: {
        width: widthObj.width82,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '8-3',
      data: { label: '8/3' },
      position: { x: xObj.x83, y: rowSpacing.row78 },
      style: {
        width: widthObj.width83,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '8-4',
      data: { label: '8/4' },
      position: { x: xObj.x84, y: rowSpacing.row78 },
      style: {
        width: widthObj.width84,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '8-5',
      data: { label: '8/5' },
      position: { x: xObj.x85, y: rowSpacing.row78 },
      style: {
        width: widthObj.width85,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '8-6',
      data: { label: '8/6' },
      position: { x: xObj.x86, y: rowSpacing.row78 },
      style: {
        width: widthObj.width86,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '8-7',
      data: { label: '8/7' },
      position: { x: xObj.x87, y: rowSpacing.row78 },
      style: {
        width: widthObj.width87,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
    {
      id: '8-8',
      data: { label: '8/8' },
      position: { x: xObj.x88, y: rowSpacing.row78 },
      style: {
        width: widthObj.width88,
        height: heightVal,
        paddingTop: paddingTopVal,
        textAlign: 'center',
      },
    },
  ];

  return initialNodes;
};

export default getNodes;
