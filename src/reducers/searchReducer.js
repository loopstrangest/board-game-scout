//FETCH GAMES LIST FOR EACH MECHANIC INDIVIDUALLY
//AND ORDER BY WHICH GAMES SHOW UP MOST OFTEN
//GAMES FOR DUPLICATED MECHANICS WILL NATURALLY BE WEIGHTED HIGHER
import axios from "axios";
import { searchURL } from "../api";

//From the games + mechanics listed in searchCriteria, get matching games based on the highest number of matching mechanics
async function fetchGamesFromSearchCriteria(searchCriteria) {
  var allMechanics = [];
  var allGames = [];
  var gameResultsArray = [];
  var allURLs = [];
  //Add every mechanic to allMechanics
  searchCriteria.forEach((item) => {
    item.mechanics.forEach(async (mechanic) => {
      allMechanics.push(mechanic.id);
      //Get 100 most popular games with the mechanic
      allURLs.push(axios.get(searchURL(mechanic.id)));
      var mechanicGameResults = await axios.get(searchURL(mechanic.id));
      gameResultsArray = mechanicGameResults.data.games;
      //Add each game to an array
      gameResultsArray.forEach(async (game) => {
        //console.log(game);
        allGames.push(await game);
      });
    });
  });

  return allGames;
}

//export const evaluateAllGames = (searchCriteria) => async (dispatch) => {
export async function evaluateAllGames(searchCriteria) {
  return await fetchGamesFromSearchCriteria(searchCriteria);
}
