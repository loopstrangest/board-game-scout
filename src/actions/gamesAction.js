import axios from "axios";
import { popularURL, autocompleteURL } from "../api";
import { fetchGamesFromSearchCriteria } from "../actions/fetchSearchResults";

//Load games by default
export const loadGames = () => async (dispatch) => {
  //fetch axios
  const popularData = await axios.get(popularURL());
  console.log("popularData in state is:");
  console.log(popularData.data.games);

  dispatch({
    type: "FETCH_GAMES",
    payload: {
      popular: popularData.data.games,
    },
  });
};

export const fetchAutocomplete = (game_name) => async (dispatch) => {
  console.log("fetching autocomplete");
  const autocompleteGames = await axios.get(autocompleteURL(game_name));

  dispatch({
    type: "FETCH_AUTOCOMPLETE",
    payload: {
      autocomplete: autocompleteGames.data.games,
    },
  });
};

export const addGameToSearchCriteria = (criteria) => async (dispatch) => {
  dispatch({
    type: "ADD_GAME_TO_SEARCH_CRITERIA",
    payload: {
      newCriteria: criteria,
    },
  });
};

export const removeGameFromSearchCriteria = (criteria) => async (dispatch) => {
  dispatch({
    type: "REMOVE_GAME_FROM_SEARCH_CRITERIA",
    payload: {
      removeCriteria: criteria,
    },
  });
};

//Triggered by UI search button click
export const fetchSearch = (searchCriteria) => async (dispatch) => {
  dispatch({
    type: "LOADING_SEARCH_RESULTS",
    payload: {
      loadingSearchResults: true,
    },
  });
  const search = await fetchGamesFromSearchCriteria(searchCriteria);
  const searchResults = search[0];
  const numSearchMechanics = search[1];

  dispatch({
    type: "FETCH_SEARCH",
    payload: {
      searchCriteriaDisplay: JSON.parse(JSON.stringify(searchCriteria)),
      searchResults: searchResults,
      numSearchMechanics: numSearchMechanics,
      loadingSearchResults: false,
    },
  });
};
