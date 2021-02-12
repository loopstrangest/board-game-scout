import axios from "axios";
import { popularURL, searchURL, newestURL, autocompleteURL } from "../api";

//Action Creator

//Load games by default
export const loadGames = () => async (dispatch) => {
  //fetch axios
  const popularData = await axios.get(popularURL());
  const searchData = await axios.get(searchURL());
  const newestData = await axios.get(newestURL());

  dispatch({
    type: "FETCH_GAMES",
    payload: {
      popular: popularData.data.games,
      search: searchData.data.games,
      newest: newestData.data.games,
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

export const fetchSearchCriteria = (criteria) => async (dispatch) => {
  dispatch({
    type: "FETCH_SEARCH_CRITERIA",
    payload: {
      newCriteria: criteria,
    },
  });
};
