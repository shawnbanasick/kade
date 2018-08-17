import store from "../../store";

const loadingsTableRowHighlighting = function(highlighting) {
  let rowClassRulesLoadingsTable;

  if (highlighting === "grays") {
    rowClassRulesLoadingsTable = {
      factor1bw: function(params) {
        console.log(params);

        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 1;
      },
      factor2bw: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 2;
      },
      factor3bw: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 3;
      },
      factor4bw: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 4;
      },
      factor5bw: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 5;
      },
      factor6bw: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 6;
      },
      factor7bw: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 7;
      },
      factor8bw: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 8;
      }
    };
  }

  if (highlighting === "colors") {
    rowClassRulesLoadingsTable = {
      factor1clr: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 1;
      },
      factor2clr: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 2;
      },
      factor3clr: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 3;
      },
      factor4clr: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 4;
      },
      factor5clr: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 5;
      },
      factor6clr: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 6;
      },
      factor7clr: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 7;
      },
      factor8clr: function(params) {
        var factorGroupColorIndicator = +params.data.factorGroup.slice(1, 2);
        return factorGroupColorIndicator === 8;
      }
    };
  }
  if (highlighting === "none") {
    rowClassRulesLoadingsTable = {};
  }
  store.setState({
    rowClassRulesLoadingsTable: rowClassRulesLoadingsTable
  });

  return rowClassRulesLoadingsTable;
};
export default loadingsTableRowHighlighting;
