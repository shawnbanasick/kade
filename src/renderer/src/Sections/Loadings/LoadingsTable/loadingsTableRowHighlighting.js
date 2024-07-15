import state from '../../../store';

function loadingsTableRowHighlighting(highlighting) {
  let rowClassRulesLoadingsTable;

  // todo - remove dead code like this

  if (highlighting === 'grays') {
    rowClassRulesLoadingsTable = {
      factor1bw(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 1;
      },
      factor2bw(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 2;
      },
      factor3bw(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 3;
      },
      factor4bw(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 4;
      },
      factor5bw(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 5;
      },
      factor6bw(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 6;
      },
      factor7bw(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 7;
      },
      factor8bw(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 8;
      },
    };
  }

  if (highlighting === 'colors') {
    rowClassRulesLoadingsTable = {
      factor1clr(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 1;
      },
      factor2clr(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 2;
      },
      factor3clr(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 3;
      },
      factor4clr(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 4;
      },
      factor5clr(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 5;
      },
      factor6clr(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 6;
      },
      factor7clr(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 7;
      },
      factor8clr(params) {
        const factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 8;
      },
    };
  }
  if (highlighting === 'none') {
    rowClassRulesLoadingsTable = {};
  }
  state.setState({
    rowClassRulesLoadingsTable,
  });

  return rowClassRulesLoadingsTable;
}
export default loadingsTableRowHighlighting;
