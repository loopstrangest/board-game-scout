const initState = {
  popular: [],
  search: [],
  newest: [],
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
    default:
      return { ...state };
  }
};

export default gamesReducer;
