import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
//components
import Game from "../components/Game";
import Search from "../components/Search";
import SearchResults from "../components/SearchResults";
import Explainer from "../components/Explainer";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  //fetch games
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  const toggleExplainer = () => {
    dispatch({ type: "TOGGLE_EXPLAINER" });
  };

  //use fontawesomeicon
  const flag = <FontAwesomeIcon icon={faFlag} />;
  const question = (
    <FontAwesomeIcon
      class="question"
      onClick={toggleExplainer}
      icon={faQuestion}
    />
  );
  //get data
  const { popular, searchResults } = useSelector((state) => state.games);
  const { showExplainer } = useSelector((state) => state.app);
  return (
    <GameList>
      {showExplainer ? <Explainer /> : ""}
      {question}
      <h1>
        Board Game Scout&nbsp;
        {flag}
      </h1>
      <Search />
      {searchResults.length ? <SearchResults /> : ""}
      <h2>Popular Games</h2>
      <Games>
        {popular.map((game) => (
          <Game
            name={game.name}
            rating={game.average_user_rating}
            minPlayers={game.min_players}
            maxPlayers={game.max_players}
            minTime={game.min_playtime}
            maxTime={game.max_playtime}
            price={game.price}
            year={game.year_published}
            id={game.id}
            image={game.image_url}
            url={game.url}
            key={game.id}
          />
        ))}
      </Games>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  .question {
    opacity: 33%;
    height: 50px;
    position: absolute;
    right: 10px;
    top: 10px;
    color: lightblue;
  }
  .question:hover {
    opacity: 1;
    cursor: pointer;
  }

  padding: 0rem 2.5rem;
  h2 {
    padding-top: 2rem;
  }
  h4 {
    display: flex;
    flex-direction: row;
  }
`;
const Games = styled(motion.div)`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  min-height: 30vh;
  display: grid;
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;
`;

export default Home;
