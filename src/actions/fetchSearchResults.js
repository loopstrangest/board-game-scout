//FETCH GAMES LIST FOR EACH MECHANIC INDIVIDUALLY
//AND ORDER BY WHICH GAMES SHOW UP MOST OFTEN
//GAMES FOR DUPLICATED MECHANICS WILL NATURALLY BE WEIGHTED HIGHER
import axios from "axios";
import { searchURL, allMechanicsURL } from "../api";

//From the games + mechanics listed in searchCriteria, get matching games
export async function fetchGamesFromSearchCriteria(searchCriteria) {
  console.log("searchCriteria is", searchCriteria);
  var allMechanicsWithNames = await axios.get(allMechanicsURL());
  var allGames = [];
  var inputMechanics = [];
  var gameResultsArray = [];
  var numSearchMechanics = 0;
  //Add every mechanic to allMechanics
  for (var item of searchCriteria) {
    switch (item.type) {
      case "mechanic":
        //handle mechanic input
        inputMechanics.push(item.id);
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
          inputMechanics.push(mechanic.id);
          numSearchMechanics += 1;
          mechanicGameResults = await axios.get(searchURL(mechanic.id));
          console.log("***after games fetch from mechanic***");
          gameResultsArray = await mechanicGameResults.data.games;
          //Add each game to an array
          gameResultsArray.forEach((game) => {
            allGames.push(game);
          });
        }
    }
  }
  var resultGames = await sortByFrequencyAndRemoveDuplicates(allGames);

  //Filter list of allMechanicsWithNames to only include the mechanics found from the search
  var inputMechanicsWithNames = allMechanicsWithNames.data.mechanics.filter(
    (mechanic) => inputMechanics.indexOf(mechanic.id) !== -1
  );

  //Give each result game a list of its mechanics that match the input mechanics
  resultGames.forEach((game) => {
    game["matched_mechanics"] = [];
    for (var resultGameMechanic of game.mechanics) {
      for (var inputMechanic of inputMechanicsWithNames) {
        if (inputMechanic.id === resultGameMechanic.id) {
          game["matched_mechanics"].push(inputMechanic.name);
        }
      }
    }
  });
  return [resultGames, numSearchMechanics];
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

  frequency.sort(function (first, second) {
    var diff = second.count - first.count;
    if (diff === 0) {
      return first.rank - second.rank;
    }
    return diff;
  });
  return frequency.slice(0, 61);
}
