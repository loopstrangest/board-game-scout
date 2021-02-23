import { useDispatch } from "react-redux";
import { removeFilterFromFilterCriteria } from "../actions/gamesAction";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ResultsCriteria = ({ name, value }) => {
  //use fontawesomeicon
  const x = <FontAwesomeIcon icon={faTimes} />;
  const dispatch = useDispatch();

  const clickRemove = (e) => {
    console.log(name);
    dispatch(removeFilterFromFilterCriteria(name));
    dispatch({ type: "FILTER_SEARCH_RESULTS_DISPLAY" });
  };

  return (
    <StyledResultsCriteria>
      <p>
        {name.replace("_", ". ")}: {value.toString()}
      </p>
      <button onClick={clickRemove}>{x}</button>
    </StyledResultsCriteria>
  );
};

const StyledResultsCriteria = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin: 0.25rem;
  margin-left: 0rem;
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

export default ResultsCriteria;
