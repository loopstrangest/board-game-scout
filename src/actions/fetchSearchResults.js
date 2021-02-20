//FETCH GAMES LIST FOR EACH MECHANIC INDIVIDUALLY
//AND ORDER BY WHICH GAMES SHOW UP MOST OFTEN
//GAMES FOR DUPLICATED MECHANICS WILL NATURALLY BE WEIGHTED HIGHER
import axios from "axios";
import { searchURL } from "../api";

//From the games + mechanics listed in searchCriteria, get matching games
export async function fetchGamesFromSearchCriteria(searchCriteria) {
  var allGames = [];
  var gameResultsArray = [];
  var filteredGames = [];
  var numSearchMechanics = 0;
  console.log("searchCriteria:");
  console.log(searchCriteria);
  //Add every mechanic to allMechanics
  for (var item of searchCriteria) {
    switch (item.type) {
      case "mechanic":
        //handle mechanic input
        numSearchMechanics += 1;
        var mechanicGameResults = await axios.get(searchURL(item.id));
        gameResultsArray = await mechanicGameResults.data.games;
        //Add each game to an array
        gameResultsArray.forEach((game) => {
          allGames.push(game);
        });
        break;
      default:
        //handle game input
        var mechanics = item.mechanics;
        for (var mechanic of mechanics) {
          numSearchMechanics += 1;
          var mechanicGameResults = await axios.get(searchURL(mechanic.id));
          console.log("***after games fetch from mechanic***");
          gameResultsArray = await mechanicGameResults.data.games;
          //Add each game to an array
          gameResultsArray.forEach((game) => {
            allGames.push(game);
          });
        }
    }
  }
  console.log("allGames.length:", allGames.length);
  console.log("***start of sort***");
  filteredGames = await sortByFrequencyAndRemoveDuplicates(allGames);
  console.log("***end of sort***");
  console.log(filteredGames);
  console.log("***end of fetchGamesFromSearchCriteria***");
  return [filteredGames, numSearchMechanics];
}

//Sort and filter games based on the highest number of matching mechanics
function sortByFrequencyAndRemoveDuplicates(arr) {
  var frequency = arr.reduce(function (accumulatorObject, currentValue) {
    var elementInArray = accumulatorObject.find(
      (element) => element.id === currentValue.id
    );
    if (elementInArray) {
      elementInArray.count++;
    } else {
      var newObject = currentValue;
      newObject.count = 1;
      accumulatorObject.push(newObject);
    }
    return accumulatorObject;
  }, []);

  console.log("frequency");
  console.log(frequency);

  frequency.sort(function (first, second) {
    var diff = second.count - first.count;
    if (diff === 0) {
      return first.rank - second.rank;
    }
    return diff;
  });
  return frequency;
}
