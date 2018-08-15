const inflectPrincipalComponents = function(eigenVecs, inflectionArray) {
    // check and inflect components if necessary
    for (var s = 0, sLen = eigenVecs[0].length; s < sLen; s++) {
        if (inflectionArray[s] < 0.0) {
            for (var t = 0; t < eigenVecs.length; t++) {
                eigenVecs[t][s] = -eigenVecs[t][s];
            }
        }
    }
    return eigenVecs;
};

export default inflectPrincipalComponents;
