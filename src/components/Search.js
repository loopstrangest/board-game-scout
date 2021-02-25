//redux and routes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadGames,
  fetchAutocomplete,
  fetchSearch,
} from "../actions/gamesAction";
import Autocomplete from "../components/Autocomplete";
import SearchCriteria from "../components/SearchCriteria";
import Loading from "../components/Loading";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Search = () => {
  var searchInputTimer;
  const dispatch = useDispatch();

  const handleKeyUp = (e) => {
    clearTimeout(searchInputTimer);
    searchInputTimer = setTimeout(function () {
      inputHandler(e);
    }, 500);
  };

  function inputHandler(e) {
    if (e.target.value === "") {
      dispatch({ type: "CLEAR_AUTOCOMPLETE" });
    } else {
      dispatch(fetchAutocomplete(e.target.value.toLowerCase()));
    }
  }

  function clickSearch() {
    dispatch({ type: "CLEAR_SEARCH_RESULTS" });
    dispatch(fetchSearch(searchCriteria));
  }

  //fetch games
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  //get data
  const { autocomplete, searchCriteria } = useSelector((state) => state.games);
  const { loadingResults } = useSelector((state) => state.app);

  return (
    <StyledSearch>
      <div class="searchInfo">
        <label for="criteriaSearch">Select Games + Mechanics: </label>
        <input id="criteriaSearch" type="search" onKeyUp={handleKeyUp} />
      </div>
      {searchCriteria.length ? (
        <SearchElements>
          {searchCriteria.map((criteria) => (
            <SearchCriteria
              criteria={criteria}
              name={criteria.name}
              url={criteria.url}
              id={criteria.id}
              key={criteria.id}
            />
          ))}
          <button class="searchButton" onClick={clickSearch}>
            Search
          </button>
        </SearchElements>
      ) : (
        ""
      )}
      {loadingResults ? <Loading /> : ""}
      {autocomplete.length ? (
        <AutocompleteList>
          {autocomplete.map((autoResult) => {
            return (
              <Autocomplete
                type={autoResult.type}
                autoResult={autoResult}
                name={autoResult.name}
                id={autoResult.id}
                image={autoResult.image_url}
                key={autoResult.id}
              />
            );
          })}
        </AutocompleteList>
      ) : (
        ""
      )}
    </StyledSearch>
  );
};

const StyledSearch = styled(motion.div)`
  * {
    font-size: 20px;
  }

  #criteriaSearch {
    border: 1px solid lightblue;
  }

  padding-top: 2rem;
  .searchInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.25rem;
    flex-direction: row;
  }
  label {
    text-align: right;
    margin-right: 0.5rem;
  }
`;

const SearchElements = styled(motion.div)`
  display: flex;
  * {
    font-size: 20px;
  }

  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.25rem;
  flex-direction: row;
  button {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid white;
    margin-top: auto;
    margin-bottom: auto;
    background: none;
    cursor: pointer;
  }
  .searchButton {
    margin: 0.25rem;
    border: 1px solid lightblue;
  }
  .searchButton:hover {
    background-color: lightblue;
  }
`;

const AutocompleteList = styled(motion.div)`
  border: 1px solid lightblue;
  position: absolute;
  left: 10%;
  width: 80%;
  display: block;
  z-index: 1;
`;

export default Search;
