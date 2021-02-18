import axios from "axios";
import { popularURL, autocompleteURL } from "../api";
import { evaluateAllGames } from "../reducers/searchReducer";

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
  console.log("fetching search ");
  const searchResults = await evaluateAllGames(searchCriteria);
  console.log("searchResults:");
  console.log(searchResults);
  console.log("searchResults size:", searchResults.length);

  dispatch({
    type: "LOADING_SEARCH_RESULTS",
    payload: {
      loadingSearchResults: true,
    },
  });

  setTimeout(() => {
    dispatch({
      type: "FETCH_SEARCH",
      payload: {
        searchResults: searchResults,
        loadingSearchResults: false,
      },
    });
  }, 5000);
};
