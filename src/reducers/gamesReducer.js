const initState = {
  popular: [],
  autocomplete: [],
  searchCriteria: [],
  loadingSearchResults: false,
  searchResults: [],
};

function checkNewCriteriaIsUnique(searchCriteria, newCriteria) {
  var isNewCriteria = true;
  searchCriteria.forEach(function (item) {
    if (newCriteria.id === item.id) {
      isNewCriteria = false;
    }
  });
  return isNewCriteria ? searchCriteria.concat(newCriteria) : searchCriteria;
}

function removeSearchCriteriaFromSearchResults(searchCriteria, searchResults) {
  searchCriteria.forEach(function (criteria) {
    searchResults.forEach(function (result, index) {
      if (result.id === criteria.id) {
        searchResults.splice(index, 1);
      }
    });
  });
  return searchResults;
}

function deleteSearchCriteria(searchCriteria, removeCriteria) {
  searchCriteria.forEach(function (item, index) {
    if (removeCriteria.id === item.id) {
      searchCriteria.splice(index, 1);
    }
  });
  return searchCriteria;
}

const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {
        ...state,
        popular: action.payload.popular,
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
    case "ADD_GAME_TO_SEARCH_CRITERIA":
      return {
        ...state,
        searchCriteria: checkNewCriteriaIsUnique(
          state.searchCriteria,
          action.payload.newCriteria
        ),
      };
    case "REMOVE_GAME_FROM_SEARCH_CRITERIA":
      return {
        ...state,
        searchCriteria: deleteSearchCriteria(
          state.searchCriteria,
          action.payload.removeCriteria
        ),
      };
    case "FETCH_SEARCH":
      return {
        ...state,
        searchResults: removeSearchCriteriaFromSearchResults(
          state.searchCriteria,
          action.payload.searchResults
        ),
        loadingSearchResults: action.payload.loadingSearchResults,
      };
    case "LOADING_SEARCH_RESULTS":
      return {
        ...state,
        loadingSearchResults: action.payload.loadingSearchResults,
      };
    default:
      return { ...state };
  }
};

export default gamesReducer;
