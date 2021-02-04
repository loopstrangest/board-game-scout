const initState = {
  popular: [],
  search: [],
};

const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return { ...state, search: action.payload.search };
    default:
      return { ...state };
  }
};

export default gamesReducer;
