import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
//components
import Game from "../components/Game";
import Search from "../components/Search";
import SearchResults from "../components/SearchResults";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";

const Home = () => {
  //use fontawesomeicon
  const flag = <FontAwesomeIcon icon={faFlag} />;
  //fetch games
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  //get data
  const { popular, searchResults } = useSelector((state) => state.games);
  return (
    <GameList>
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
  padding: 0rem 2.5rem;
  h2 {
    padding-top: 5rem;
  }
  h4 {
    display: flex;
    flex-direction: row;
    padding-bottom: 1rem;
  }
  .criteriaName {
    padding-left: 1rem;
    margin-top: 0;
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

export default Home;
