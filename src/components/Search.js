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
    }, 250);
  };

  function inputHandler(e) {
    console.log("value is", e.target.value);
    if (e.target.value === "") {
      dispatch({ type: "CLEAR_AUTOCOMPLETE" });
    } else {
      dispatch(fetchAutocomplete(e.target.value));
    }
  }

  function clickSearch() {
    dispatch(fetchSearch(searchCriteria));
  }

  //fetch games
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  //get data
  const { autocomplete, searchCriteria, loadingSearchResults } = useSelector(
    (state) => state.games
  );

  return (
    <StyledSearch>
      <div class="searchInfo">
        <label for="gameSearch">Find Games Like: </label>
        <input id="gameSearch" type="search" onKeyUp={handleKeyUp} />
      </div>
      {searchCriteria.length ? (
        <SearchElements>
          {searchCriteria.map((game) => (
            <SearchCriteria
              game={game}
              name={game.name}
              id={game.id}
              key={game.id}
            />
          ))}
          <button class="searchButton" onClick={clickSearch}>
            Search!
          </button>
        </SearchElements>
      ) : (
        ""
      )}
      {loadingSearchResults ? <Loading /> : ""}
      {autocomplete.length ? (
        <div>
          {autocomplete.map((game) => {
            return (
              <Autocomplete
                game={game}
                name={game.name}
                id={game.id}
                image={game.image_url}
                key={game.id}
              />
            );
          })}
        </div>
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

export default Search;
