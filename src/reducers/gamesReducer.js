const initState = {
  popular: [],
  search: [],
  newest: [],
  autocomplete: [],
};

const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {
        ...state,
        popular: action.payload.popular,
        search: action.payload.search,
        newest: action.payload.newest,
      };
    case "FETCH_AUTOCOMPLETE":
      return {
        ...state,
        autocomplete: action.payload.autocomplete,
      };
    case "CLEAR_AUTOCOMPLETE":
      return {
        ...state,
        autocomplete: [],
      };
    default:
      return { ...state };
  }
};

export default gamesReducer;
