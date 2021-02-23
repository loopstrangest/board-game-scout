const initState = {
  popular: [],
  autocomplete: [],
  searchCriteria: [],
  searchCriteriaDisplay: [],
  loadingSearchResults: false,
  searchResults: [],
  searchResultsDisplay: [],
  filterCriteria: {},
  numSearchMechanics: 0,
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
        loadingSearchResults: action.payload.loadingSearchResults,
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
          state.searchCriteriaDisplay,
          action.payload.searchResults
        ),
        searchResultsDisplay: removeSearchCriteriaFromSearchResults(
          state.searchCriteriaDisplay,
          action.payload.searchResults
        ),
        numSearchMechanics: action.payload.numSearchMechanics,
        loadingSearchResults: action.payload.loadingSearchResults,
      };
    case "UPDATE_SEARCH_CRITERIA_DISPLAY":
      return {
        ...state,
        searchCriteriaDisplay: action.payload.searchCriteriaDisplay,
      };
    case "LOADING_SEARCH_RESULTS":
      return {
        ...state,
        loadingSearchResults: action.payload.loadingSearchResults,
      };
    case "CLEAR_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: [],
        searchResultsDisplay: [],
        searchCriteriaDisplay: [],
      };
    case "UPDATE_FILTER_CRITERIA":
      return {
        ...state,
        filterCriteria: Object.assign(
          state.filterCriteria,
          action.payload.newFilterCriteria
        ),
      };
    case "REMOVE_FILTER_FROM_FILTER_CRITERIA":
      delete state.filterCriteria[action.payload.removeFilterCriteria];
      return {
        ...state,
      };
    case "FILTER_SEARCH_RESULTS_DISPLAY":
      var filteredSearchResultsDisplay = state.searchResults;
      for (const [criteria, valueString] of Object.entries(
        state.filterCriteria
      )) {
        switch (criteria) {
          case "Players":
            let playersValue = parseInt(valueString.charAt(0));
            filteredSearchResultsDisplay = filteredSearchResultsDisplay.filter(
              (game) => game["max_players"] >= playersValue
            );
            if (playersValue !== 9) {
              filteredSearchResultsDisplay = filteredSearchResultsDisplay.filter(
                (game) => game["min_players"] <= playersValue
              );
            }
            break;
          case "Playtime":
            let playtimeValue = valueString.substr(0, valueString.indexOf(" "));
            if (playtimeValue !== "120+") {
              filteredSearchResultsDisplay = filteredSearchResultsDisplay.filter(
                (game) =>
                  game["min_playtime"] <= parseInt(playtimeValue) &&
                  game["max_playtime"] >= parseInt(playtimeValue)
              );
            } else {
              filteredSearchResultsDisplay = filteredSearchResultsDisplay.filter(
                (game) => game["max_playtime"] >= 120
              );
            }
            break;
          case "Rating":
            let ratingValue = parseFloat(valueString.split("+")[0]);
            console.log(ratingValue);
            filteredSearchResultsDisplay = filteredSearchResultsDisplay.filter(
              (game) => game["average_user_rating"] >= ratingValue
            );
            break;
          case "Min. Year":
            let minYearValue = parseInt(valueString);
            filteredSearchResultsDisplay = filteredSearchResultsDisplay.filter(
              (game) => game["year_published"] >= minYearValue
            );
            break;
          case "Max. Year":
            let maxYearValue = parseInt(valueString);
            filteredSearchResultsDisplay = filteredSearchResultsDisplay.filter(
              (game) => game["year_published"] <= maxYearValue
            );
            break;
          case "Min. Price":
            let minPriceValue = parseInt(valueString.substring(1));
            console.log(minPriceValue);
            filteredSearchResultsDisplay = filteredSearchResultsDisplay.filter(
              (game) => game["price"] >= minPriceValue
            );
            break;
          case "Max. Price":
            let maxPriceValue = parseInt(valueString.substring(1));
            filteredSearchResultsDisplay = filteredSearchResultsDisplay.filter(
              (game) => game["price"] <= maxPriceValue
            );
            break;
          default:
        }
      }
      return {
        ...state,
        searchResultsDisplay: filteredSearchResultsDisplay,
      };

    default:
      return { ...state };
  }
};

export default gamesReducer;
