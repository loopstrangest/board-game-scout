const initState = {
  popular: [],
  search: [],
  newest: [],
  autocomplete: [],
  searchCriteria: [],
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
    case "FETCH_SEARCH_CRITERIA":
      return {
        ...state,
        searchCriteria: Array.from(
          new Set(state.searchCriteria.concat(action.payload.newCriteria))
        ),
      };
    default:
      return { ...state };
  }
};

export default gamesReducer;
