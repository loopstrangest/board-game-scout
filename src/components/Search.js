//redux and routes
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames, fetchAutocomplete } from "../actions/gamesAction";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Search = () => {
  const dispatch = useDispatch();
  const [autocompleteInput, setAutocompleteInput] = useState("");

  const inputHandler = (e) => {
    if (e.target.value == "") {
      dispatch({ type: "CLEAR_AUTOCOMPLETE" });
    } else {
      dispatch(fetchAutocomplete(e.target.value));
    }
    setAutocompleteInput(e.target.value);
  };

  const submitSearch = (e) => {
    //e.preventDefault();
    //dispatch(fetchAutocomplete(searchInput));
    //setSearchInput("");
  };
  //fetch games
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  //get data
  const { autocomplete } = useSelector((state) => state.games);
  //LOCKED OTHER GOOD VERSION
  return (
    <StyledSearch>
      <input type="search" value={autocompleteInput} onChange={inputHandler} />
      <input type="submit" value="Search!" onClick={submitSearch}></input>

      {autocomplete.length ? (
        <div>
          {autocomplete.map((game) => (
            <p key={game.id}>{game.name} </p>
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
`;

/*
//LOCKED GOOD VERSION
const Search = () => {
  return (
    <StyledSearch>
      <input type="search"></input>

      <input type="submit" value="Search!"></input>
    </StyledSearch>
  );
};
*/
export default Search;
