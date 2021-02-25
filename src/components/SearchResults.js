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

  const openGamePage = (url) => () => {
    window.open(url);
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
        {searchCriteriaDisplay.map((criteria) => {
          return (
            <p
              key={criteria.name}
              class="criteriaName"
              onClick={openGamePage(criteria.url)}
            >
              {criteria.name}
            </p>
          );
        })}
      </h4>
      <ResultsFilters />
      {searchResultsDisplay.length ? (
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
      ) : (
        <div className="no-results">
          <p>no results :(</p>
        </div>
      )}
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
  .criteriaName {
    display: flex;
    justify-content: space-between;
    margin: 0 0.25rem;
    background-color: lightblue;
    border-radius: 5px;
    padding: 2px 5px;
  }
  .criteriaName:hover {
    color: white;
    cursor: pointer;
  }

  .no-results {
    display: flex;
    justify-content: center;
  }

  .no-results p {
    font-size: 2rem;
    margin-top: 1.5rem;
    padding: 0 0.5rem;
    border-radius: 1rem;
    box-shadow: 0px 5px 20px lightblue;
  }
`;

const Games = styled(motion.div)`
  padding-top: 1.5rem;
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default SearchCriteria;
