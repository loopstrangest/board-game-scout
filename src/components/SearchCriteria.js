import { useDispatch } from "react-redux";
import { removeGameFromSearchCriteria } from "../actions/gamesAction";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const SearchCriteria = ({ game, name, image }) => {
  const dispatch = useDispatch();

  const clickRemove = (e) => {
    dispatch(removeGameFromSearchCriteria(game));
  };

  return (
    <StyledSearchCriteria>
      <p>{name}</p>
      <button onClick={clickRemove}>X</button>
    </StyledSearchCriteria>
  );
};

const StyledSearchCriteria = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin-right: 0.5rem;
  background-color: lightblue;
  border-radius: 5px;
  padding: 0px 5px;
  p {
    margin: auto;
  }
  button:hover {
    background-color: white;
  }
`;

export default SearchCriteria;
