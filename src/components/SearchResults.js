import { useDispatch, useSelector } from "react-redux";
import Game from "../components/Game";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ResultsFilters from "./ResultsFilters";

const SearchCriteria = () => {
  //use fontawesomeicon
  const x = <FontAwesomeIcon icon={faTimes} />;
  const dispatch = useDispatch();

  //get data
  const {
    searchResultsDisplay,
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
          {x}
        </button>
      </h2>
      <h4>
        <p>Searched Games + Mechanics:</p>
        {searchCriteriaDisplay.map((game) => {
          return (
            <p key={game.name} class="criteriaName">
              {game.name}
            </p>
          );
        })}
      </h4>
      <ResultsFilters />
      <Games>
        {searchResultsDisplay.map((game) => {
          return (
            <Game
              name={game.name}
              rating={game.average_user_rating}
              year={game.year_published}
              minPlayers={game.min_players}
              maxPlayers={game.max_players}
              price={game.price}
              minTime={game.min_playtime}
              maxTime={game.max_playtime}
              id={game.id}
              count={game.count}
              numSearchMechanics={numSearchMechanics}
              matchedMechanics={game.matched_mechanics}
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
