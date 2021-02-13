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
  const { autocomplete, searchCriteria } = useSelector((state) => state.games);

  return (
    <StyledSearch>
      <div class="searchInfo">
        <label for="gameSearch">Find Games Like: </label>
        <input id="gameSearch" type="search" onKeyUp={handleKeyUp} />
        {searchCriteria.length ? (
          <div class="searchCriteria">
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
          </div>
        ) : (
          ""
        )}
      </div>

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
  .searchInfo,
  .searchCriteria {
    display: flex;
    margin-bottom: 0.25rem;
    flex-direction: row;
  }
  .searchInfo {
    height: 50px;
  }
  label,
  input {
    margin-right: 0.5rem;
    margin-top: auto;
    margin-bottom: auto;
  }
  button {
    height: 75%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid white;
    margin-left: 0.5rem;
    margin-top: auto;
    margin-bottom: auto;
    background: none;
    cursor: pointer;
  }
  .searchButton {
    border: 1px solid lightblue;
  }
  .searchButton:hover {
    background-color: lightblue;
  }
`;

export default Search;
