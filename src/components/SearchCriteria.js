import { useDispatch } from "react-redux";
import { removeGameFromSearchCriteria } from "../actions/gamesAction";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchCriteria = ({ game, name, image }) => {
  //use fontawesomeicon
  const x = <FontAwesomeIcon icon={faTimes} />;
  const dispatch = useDispatch();

  const clickRemove = (e) => {
    dispatch(removeGameFromSearchCriteria(game));
  };

  return (
    <StyledSearchCriteria>
      <p>{name}</p>
      <button onClick={clickRemove}>{x}</button>
    </StyledSearchCriteria>
  );
};

const StyledSearchCriteria = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin: 0.25rem;
  background-color: lightblue;
  border-radius: 5px;
  padding: 0px 5px;
  p {
    margin: auto;
    margin-right: 0.25rem;
  }
  button {
    height: 75%;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
  }
  button:hover {
    background-color: white;
  }
`;

export default SearchCriteria;
