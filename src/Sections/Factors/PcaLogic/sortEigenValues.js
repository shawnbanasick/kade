const sortEigenValues = values => {
  values.sort((a, b) => b - a);
  return values;
};

export default sortEigenValues;
