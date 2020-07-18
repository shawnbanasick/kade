const indicateDataButtonColor = (
  isForcedQsortPattern,
  isDataButtonGreen,
  hasUnforcedBeenConfirmed
) => {
  if (isForcedQsortPattern && isDataButtonGreen) {
    // is forced and data loaded
    return "var(--main-theme-color)";
  }
  if (isForcedQsortPattern && !isDataButtonGreen) {
    // is forced and data not loaded
    return "#d6dbe0";
  }
  if (!isForcedQsortPattern && isDataButtonGreen && hasUnforcedBeenConfirmed) {
    // if unforced and data loaded and confirmed
    return "var(--main-theme-color)";
  }
  if (!isForcedQsortPattern && isDataButtonGreen && !hasUnforcedBeenConfirmed) {
    // if unforced and data loaded but not confirmed
    return "orange";
  }
  if (
    !isForcedQsortPattern &&
    !isDataButtonGreen &&
    !hasUnforcedBeenConfirmed
  ) {
    // if unforced and data loaded and confirmed
    return "#d6dbe0";
  }
  // default
  return "#d6dbe0";
};

export default indicateDataButtonColor;
