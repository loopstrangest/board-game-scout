import { useDispatch } from "react-redux";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Explainer = () => {
  const dispatch = useDispatch();
  const toggleExplainer = () => {
    dispatch({ type: "TOGGLE_EXPLAINER" });
  };

  //use fontawesomeicons
  const mail = <FontAwesomeIcon class="icon" icon={faEnvelope} />;
  const twitter = <FontAwesomeIcon class="icon" icon={faTwitter} />;
  const home = <FontAwesomeIcon class="icon" icon={faHome} />;

  return (
    <ExplainerShadow onClick={toggleExplainer}>
      <Information>
        <p>
          Board Game Scout helps you discover board games that are similar to
          games you know and love.
        </p>
        <p>
          Select any number of games and/or game mechanics and click 'Search' to
          load a list of matching games.
        </p>
        <p>
          Click any game to visit its Board Game Atlas page with additional
          information.
        </p>
        <p>
          Optionally filter search results by number of players, playtime,
          rating, publish year, and price.
        </p>
        <p>
          Thanks to{" "}
          <a
            href="https://www.boardgameatlas.com/"
            target="_blank"
            rel="noreferrer"
          >
            <u>Board Game Atlas</u>
          </a>{" "}
          for providing the game data.
        </p>
        <hr />
        <p class="aboutMe">
          Board Game Scout is made by Loopy, a web developer actively seeking
          work opportunities.
        </p>
        <div className="links">
          <a
            href="https://twitter.com/strangestloop"
            target="_blank"
            rel="noreferrer"
          >
            {twitter}
          </a>
          <a href="mailto:loopstrangest@gmail.com">{mail}</a>
          <a href="https://strangestloop.io" target="_blank" rel="noreferrer">
            {home}
          </a>
        </div>
      </Information>
    </ExplainerShadow>
  );
};

const ExplainerShadow = styled(motion.div)`
  width: 100%;
  display: flex;
  height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Information = styled(motion.div)`
  display: block;
  width: 75%;
  height: min-content;
  margin: auto;
  border-radius: 1rem;
  padding: 1rem 3rem;
  background: white;
  position: relative;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }
  p {
    padding: 0.5rem 0rem;
  }
  hr {
    margin: 0.5rem 0rem;
  }

  .links,
  .aboutMe {
    display: flex;
    justify-content: center;
  }
  .links {
    margin-top: 0.5rem;
    height: 2rem;
  }
  .links a {
    display: inline-block;
    height: 100%;
  }
  .icon {
    opacity: 50%;
    height: 100%;
    padding: 0 0.5rem;
    color: lightblue;
  }
  .icon:hover {
    opacity: 100%;
    cursor: pointer;
  }
`;

export default Explainer;
