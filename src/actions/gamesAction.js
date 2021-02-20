import axios from "axios";
import { popularURL, autocompleteURL, allMechanicsURL } from "../api";
import { fetchGamesFromSearchCriteria } from "../actions/fetchSearchResults";

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

export const fetchAutocomplete = (search_string) => async (dispatch) => {
  dispatch({ type: "CLEAR_AUTOCOMPLETE" });
  dispatch({
    type: "LOADING_SEARCH_RESULTS",
    payload: {
      loadingSearchResults: true,
    },
  });

  const autocompleteGames = await axios.get(autocompleteURL(search_string));
  const autocompleteMechanics = await axios.get(allMechanicsURL());

  //Format mechanics for autocomplete display
  var filteredMechanics = autocompleteMechanics.data.mechanics.filter(
    (mechanic) => mechanic.name.toLowerCase().includes(search_string)
  );
  filteredMechanics =
    filteredMechanics.length > 2
      ? filteredMechanics.slice(0, 2)
      : filteredMechanics;
  filteredMechanics.forEach((mechanic) => {
    mechanic.type = "mechanic";
  });

  const combinedAutocompleteResults = filteredMechanics.concat(
    autocompleteGames.data.games
  );

  dispatch({
    type: "FETCH_AUTOCOMPLETE",
    payload: {
      autocomplete: combinedAutocompleteResults,
      loadingSearchResults: false,
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
  //Make copy of searchCriteria that is unaffected by user actions
  const copyOfSearchCriteria = JSON.parse(JSON.stringify(searchCriteria));
  dispatch({
    type: "LOADING_SEARCH_RESULTS",
    payload: {
      loadingSearchResults: true,
    },
  });
  dispatch({
    type: "UPDATE_SEARCH_CRITERIA_DISPLAY",
    payload: {
      searchCriteriaDisplay: copyOfSearchCriteria,
    },
  });
  const searchData = await fetchGamesFromSearchCriteria(copyOfSearchCriteria);
  const searchResults = searchData[0];
  const numSearchMechanics = searchData[1];

  dispatch({
    type: "FETCH_SEARCH",
    payload: {
      searchResults: searchResults,
      numSearchMechanics: numSearchMechanics,
      loadingSearchResults: false,
    },
  });
};
