//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Game = ({ name, year, url, image, count, numSearchMechanics }) => {
  const openGamePage = () => {
    window.open(url);
  };
  return (
    <StyledGame onClick={openGamePage}>
      <h3>{name}</h3>
      {numSearchMechanics > 0 ? (
        <p>{Math.round((count / numSearchMechanics) * 100)}% Match</p>
      ) : (
        ""
      )}
      <p>{year}</p>
      <img src={image} alt={name} />
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  cursor: pointer;
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  img {
    width: 100%;
    height: 40vh;
    object-fit: contain;
  }
`;

export default Game;
