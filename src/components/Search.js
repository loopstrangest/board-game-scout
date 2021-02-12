//redux and routes
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames, fetchAutocomplete } from "../actions/gamesAction";
import Autocomplete from "../components/Autocomplete";

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
    if (e.target.value == "") {
      dispatch({ type: "CLEAR_AUTOCOMPLETE" });
    } else {
      dispatch(fetchAutocomplete(e.target.value));
    }
  }

  const submitSearch = (e) => {
    console.log("submitted search");
  };

  //fetch games
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  //get data
  const { autocomplete, searchCriteria } = useSelector((state) => state.games);

  return (
    <StyledSearch>
      <div class="searchInfo">
        <input id="gameSearch" type="search" onKeyUp={handleKeyUp} />
        <input type="submit" value="Search!" onClick={submitSearch}></input>
        {searchCriteria.length ? (
          <div class="searchCriteria">
            {/* {searchCriteria.map((game) => (
              <p>placeholder</p>
            ))} */}
          </div>
        ) : (
          ""
        )}
      </div>

      {autocomplete.length ? (
        <div>
          {autocomplete.map((game) => (
            <Autocomplete
              name={game.name}
              id={game.id}
              image={game.image_url}
              key={game.id}
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </StyledSearch>
  );
};

const StyledSearch = styled(motion.div)`
  padding-top: 2rem;
  .searchInfo,
  .searchCriteria {
    display: flex;
    flex-direction: row;
  }
`;

export default Search;
