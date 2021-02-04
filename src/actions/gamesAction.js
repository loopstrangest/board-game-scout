import axios from "axios";
import { searchURL } from "../api";

//Action Creator

export const loadGames = () => async (dispatch) => {
  //fetch axios
  const searchData = await axios.get(searchURL());
  dispatch({
    type: "FETCH_GAMES",
    payload: {
      search: searchData.data.games,
    },
  });
};
