import axios from "axios";
import { popularURL, searchURL, autocompleteURL } from "../api";
import { fetchURLSearchParameters } from "../reducers/searchReducer";

//Action Creator

//Load games by default
export const loadGames = () => async (dispatch) => {
  //fetch axios
  const popularData = await axios.get(popularURL());

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

export const fetchSearch = (searchCriteria) => async (dispatch) => {
  console.log("fetching search ");
  const searchResults = await axios.get(
    searchURL(fetchURLSearchParameters(searchCriteria))
  );

  dispatch({
    type: "FETCH_SEARCH",
    payload: {
      searchResults: searchResults.data.games,
    },
  });
};
