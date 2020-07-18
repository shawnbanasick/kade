const inflectPrincipalComponents = (eigenVecs, inflectionArray) => {
  // check and inflect components if necessary
  for (let s = 0, sLen = eigenVecs[0].length; s < sLen; s += 1) {
    if (inflectionArray[s] < 0.0) {
      for (let t = 0; t < eigenVecs.length; t += 1) {
        eigenVecs[t][s] = -eigenVecs[t][s];
      }
    }
  }
  return eigenVecs;
};

export default inflectPrincipalComponents;
