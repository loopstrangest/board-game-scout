import { useDispatch } from "react-redux";
import { removeSelectionFromSearchCriteria } from "../actions/gamesAction";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchCriteria = ({ criteria, name, url }) => {
  //use fontawesomeicon
  const x = <FontAwesomeIcon icon={faTimes} />;
  const dispatch = useDispatch();

  const clickRemove = (e) => {
    dispatch(removeSelectionFromSearchCriteria(criteria));
  };

  const openGamePage = () => {
    window.open(url);
  };

  return (
    <StyledSearchCriteria>
      <p onClick={openGamePage}>{name}</p>
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
  p:hover {
    color: white;
    cursor: pointer;
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
