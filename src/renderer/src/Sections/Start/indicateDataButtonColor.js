const indicateDataButtonColor = (isDataButtonGreen, hasDataBeenConfirmed) => {
  if (isDataButtonGreen && hasDataBeenConfirmed) {
    // if unforced and data loaded and confirmed
    return 'bg-primary-button';
  }
  if (isDataButtonGreen && !hasDataBeenConfirmed) {
    // if unforced and data loaded but not confirmed
    return 'bg-orange-button';
  }
  if (!isDataButtonGreen && !hasDataBeenConfirmed) {
    // if unforced and data loaded and confirmed
    return 'bg-grey-button';
  }
  return 'bg-grey-button';
};

export default indicateDataButtonColor;
