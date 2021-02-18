import { useDispatch } from "react-redux";
import { addGameToSearchCriteria } from "../actions/gamesAction";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Autocomplete = ({ game, name, image }) => {
  const dispatch = useDispatch();

  const clickAutocomplete = (e) => {
    dispatch(addGameToSearchCriteria(game));
    document.getElementById("gameSearch").value = "";
    dispatch({ type: "CLEAR_AUTOCOMPLETE" });
  };

  const onHover = (e) => {
    e.target.style.backgroundColor = "lightblue";
  };
  const offHover = (e) => {
    e.target.style.backgroundColor = "white";
  };

  return (
    <StyledAutocomplete
      onClick={clickAutocomplete}
      onMouseOver={onHover}
      onMouseOut={offHover}
    >
      <div className="image-container">
        <img src={image} alt={name} />
      </div>
      <p>{name}</p>
    </StyledAutocomplete>
  );
};

const StyledAutocomplete = styled(motion.div)`
  display: flex;
  justify-content: left;
  cursor: pointer;
  padding: 3px 1em 3px 0.4em;
  padding-top: auto;
  padding-bottom: auto;
  min-width: 200px;

  .image-container {
    height: 50px;
    width: 50px;
    flex: 0 0 50px;
    margin-right: 0.5rem;
    pointer-events: none;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
  p {
    display: flex;
    align-items: center;
    pointer-events: none;
  }
`;

export default Autocomplete;
