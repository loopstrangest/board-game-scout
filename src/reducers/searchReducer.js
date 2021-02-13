//From the games + mechanics listed in searchCriteria, get matching games based on the highest number of matching mechanics
export function fetchURLSearchParameters(searchCriteria) {
  //All mechanics from each game, there may be duplicates
  var allMechanics = [];
  //Add every mechanic to allMechanics
  searchCriteria.forEach((item) => {
    item.mechanics.forEach((mechanic) => {
      allMechanics.push(mechanic.id);
    });
  });
  //SORT MECHANICS into uniques and duplicates
  //A duplicated mechanic is more important to the user
  var uniqueMechanics = [];
  var searchMechanics = [];
  allMechanics.forEach((mechanic) => {
    if (
      //n>1th instance of a duplicated mechanic, do nothing
      searchMechanics.indexOf(mechanic) !== -1
    ) {
      return;
    } else if (
      //1st instance of a duplicated mechanic
      allMechanics.indexOf(mechanic) !== allMechanics.lastIndexOf(mechanic)
    ) {
      searchMechanics.push(mechanic);
    } else {
      //not a duplicate, therefore unique
      uniqueMechanics.push(mechanic);
    }
  });
  console.log("all", allMechanics);
  console.log("search", searchMechanics);
  console.log("unique", uniqueMechanics);
  var numSearch = searchMechanics.length;
  var numUnique = uniqueMechanics.length;
  var maxMechanics = 10;
  var mechanicsList =
    numSearch > 0 ? searchMechanics.join(",") : uniqueMechanics.join(",");
  console.log(mechanicsList);
  //RETURN SEARCH CRITERIA testing
  return mechanicsList;

  // var numToRemoveFromUnique = numSearch + numUnique - maxMechanics;
  // //RANDOMLY FILTER MECHANICS if necessary to adhere to API rate limits
  // if (numToRemoveFromUnique > 0) {
  //   for (var i = 0; i < numToRemoveFromUnique; i++) {
  //     uniqueMechanics.splice(
  //       Math.floor(Math.random() * uniqueMechanics.length),
  //       1
  //     );
  //   }
  // }

  // return searchCriteria;
}
