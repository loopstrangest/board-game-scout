import { useDispatch, useSelector } from "react-redux";
import { removeSearchResults } from "../actions/gamesAction";
import Game from "../components/Game";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const SearchCriteria = () => {
  const dispatch = useDispatch();

  //get data
  const {
    searchResults,
    numSearchMechanics,
    searchCriteriaDisplay,
  } = useSelector((state) => state.games);

  const removeSearchResults = (e) => {
    dispatch({ type: "CLEAR_SEARCH_RESULTS" });
  };

  return (
    <StyledSearchResults>
      <h2>
        Search Results
        <button class="clearSearchResultsButton" onClick={removeSearchResults}>
          X
        </button>
      </h2>
      <h4>
        <p>Criteria:</p>
        {searchCriteriaDisplay.map((game) => {
          return (
            <p key={game.name} class="criteriaName">
              {game.name}
            </p>
          );
        })}
      </h4>
      <Games>
        {searchResults.map((game) => {
          return (
            <Game
              name={game.name}
              year={game.year_published}
              id={game.id}
              count={game.count}
              numSearchMechanics={numSearchMechanics}
              image={game.image_url}
              url={game.url}
              key={game.id}
            />
          );
        })}
      </Games>
    </StyledSearchResults>
  );
};

const StyledSearchResults = styled(motion.div)`
  h2 {
    display: flex;
    justify-content: left;
  }
  .clearSearchResultsButton {
    padding: 5px;
    border-radius: 5px;
    background: none;
    cursor: pointer;
    margin: 0.25rem;
    margin-left: 0.5rem;
    border: 1px solid lightblue;
    font-size: 14px;
    font-weight: 700;
  }
  .clearSearchResultsButton:hover {
    background-color: lightblue;
  }
`;

const Games = styled(motion.div)`
  padding-top: 2rem;
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default SearchCriteria;
