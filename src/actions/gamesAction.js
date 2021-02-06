import axios from "axios";
import { popularURL, searchURL, newestURL } from "../api";

//Action Creator

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
