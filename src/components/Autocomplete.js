import { useDispatch } from "react-redux";
import { fetchSearchCriteria } from "../actions/gamesAction";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Autocomplete = ({ name, image }) => {
  const dispatch = useDispatch();

  const clickAutocomplete = (e) => {
    console.log("clicked an autocomplete");
    console.log(name);
    dispatch(fetchSearchCriteria(name));
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
  cursor: pointer;
  padding: 3px 1em 3px 0.4em;
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
    pointer-events: none;
  }
`;

export default Autocomplete;
