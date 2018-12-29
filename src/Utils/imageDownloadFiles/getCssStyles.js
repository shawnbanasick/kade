const getCssStyles = parentElement => {
  function contains(str, arr) {
    return arr.indexOf(str) !== -1;
  }

  const selectorTextArr = [];

  // Add Parent element Id and Classes to the list
  selectorTextArr.push(`#${parentElement.id}`);
  for (let c = 0; c < parentElement.classList.length; c += 1)
    if (!contains(`.${parentElement.classList[c]}`, selectorTextArr))
      selectorTextArr.push(`.${parentElement.classList[c]}`);

  // Add Children element Ids and Classes to the list
  const nodes = parentElement.getElementsByTagName("*");
  for (let i = 0; i < nodes.length; i += 1) {
    const id = nodes[i].id;
    if (!contains(`#${id}`, selectorTextArr)) selectorTextArr.push(`#${id}`);

    const classes = nodes[i].classList;
    for (let c = 0; c < classes.length; c += 1)
      if (!contains(`.${classes[c]}`, selectorTextArr))
        selectorTextArr.push(`.${classes[c]}`);
  }

  // Extract CSS Rules
  let extractedCSSText = "";
  for (let i = 0; i < document.styleSheets.length; i += 1) {
    const s = document.styleSheets[i];

    try {
      if (!s.cssRules) continue;
    } catch (e) {
      if (e.name !== "SecurityError") throw e; // for Firefox
      continue;
    }

    const cssRules = s.cssRules;
    for (let r = 0; r < cssRules.length; r += 1) {
      if (contains(cssRules[r].selectorText, selectorTextArr))
        extractedCSSText += cssRules[r].cssText;
    }
  }
  return extractedCSSText;
};

export default getCssStyles;
