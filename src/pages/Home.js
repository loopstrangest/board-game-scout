import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
//components
import Game from "../components/Game";
import Search from "../components/Search";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Home = () => {
  //fetch games
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  //get data
  const { popular, searchCriteria, searchResults } = useSelector(
    (state) => state.games
  );
  return (
    <GameList>
      <h1>Board Game Scout</h1>
      <Search />
      {searchResults.length ? (
        <div>
          <h2>Search Results</h2>
          <h4>
            <p>Games Like:</p>
            {searchCriteria.map((game) => {
              return <p class="criteriaName">{game.name}</p>;
            })}
          </h4>
          <Games>
            {searchResults.map((game) => {
              return (
                <Game
                  name={game.name}
                  year={game.year_published}
                  id={game.id}
                  image={game.image_url}
                  key={game.id}
                />
              );
            })}
          </Games>
        </div>
      ) : (
        ""
      )}
      <h2>Popular Games</h2>
      <Games>
        {popular.map((game) => (
          <Game
            name={game.name}
            year={game.year_published}
            id={game.id}
            image={game.image_url}
            key={game.id}
          />
        ))}
      </Games>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
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
