const indicateDataButtonColor = (isDataButtonGreen, hasDataBeenConfirmed) => {
  if (isDataButtonGreen && hasDataBeenConfirmed) {
    // if unforced and data loaded and confirmed
    return 'var(--main-theme-color)';
  }
  if (isDataButtonGreen && !hasDataBeenConfirmed) {
    // if unforced and data loaded but not confirmed
    return 'orange';
  }
  if (!isDataButtonGreen && !hasDataBeenConfirmed) {
    // if unforced and data loaded and confirmed
    return '#d6dbe0';
  }
  return '#d6dbe0';
};

export default indicateDataButtonColor;
