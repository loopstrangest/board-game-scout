import { useDispatch, useSelector } from "react-redux";
import {
  updateFilterCriteria,
  removeFilterFromFilterCriteria,
} from "../actions/gamesAction";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResultsCriteria from "../components/ResultsCriteria";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const ResultsFilters = () => {
  //use fontawesomeicon
  const down = <FontAwesomeIcon icon={faCaretDown} />;
  const dispatch = useDispatch();

  const playersParam = "Players";
  const playtimeParam = "Playtime";
  const ratingParam = "Rating";
  const minYearParam = "Min. Year";
  const maxYearParam = "Max. Year";
  const minPriceParam = "Min. Price";
  const maxPriceParam = "Max. Price";

  var inputTimer;

  const setInputFilter = (filterParam) => (e) => {
    var value;
    clearTimeout(inputTimer);
    [minPriceParam, maxPriceParam].indexOf(filterParam) !== -1
      ? (value = "$" + e.target.value)
      : (value = e.target.value);
    inputTimer = setTimeout(function () {
      if (e.target.value === "") {
        dispatch(removeFilterFromFilterCriteria(filterParam));
      } else {
        dispatch(updateFilterCriteria(filterParam, value));
      }
      dispatch({ type: "FILTER_SEARCH_RESULTS_DISPLAY" });
    }, 500);
  };

  const setClickFilter = (filterParam) => (e) => {
    var value = e.target.innerHTML;
    dispatch(updateFilterCriteria(filterParam, value));
    dispatch({ type: "FILTER_SEARCH_RESULTS_DISPLAY" });
  };

  //get data
  const { filterCriteria } = useSelector((state) => state.games);

  return (
    <StyledResultsFilters>
      <div className="filterOptions">
        <div className="dropdown">
          <p class="filter-label">Players&nbsp;{down}</p>
          <div className="dropdown-content">
            <p onClick={setClickFilter(playersParam)}>1</p>
            <p onClick={setClickFilter(playersParam)}>2</p>
            <p onClick={setClickFilter(playersParam)}>3</p>
            <p onClick={setClickFilter(playersParam)}>4</p>
            <p onClick={setClickFilter(playersParam)}>5</p>
            <p onClick={setClickFilter(playersParam)}>6</p>
            <p onClick={setClickFilter(playersParam)}>7</p>
            <p onClick={setClickFilter(playersParam)}>8</p>
            <p onClick={setClickFilter(playersParam)}>9+</p>
          </div>
        </div>
        <div className="dropdown">
          <p class="filter-label">Playtime&nbsp;{down}</p>
          <div className="dropdown-content">
            <p onClick={setClickFilter(playtimeParam)}>15 min</p>
            <p onClick={setClickFilter(playtimeParam)}>30 min</p>
            <p onClick={setClickFilter(playtimeParam)}>45 min</p>
            <p onClick={setClickFilter(playtimeParam)}>60 min</p>
            <p onClick={setClickFilter(playtimeParam)}>90 min</p>
            <p onClick={setClickFilter(playtimeParam)}>120 min</p>
            <p onClick={setClickFilter(playtimeParam)}>120+ min</p>
          </div>
        </div>
        <div className="dropdown">
          <p class="filter-label">Rating&nbsp;{down}</p>
          <div className="dropdown-content">
            <p onClick={setClickFilter(ratingParam)}>2+ Stars</p>
            <p onClick={setClickFilter(ratingParam)}>2.5+ Stars</p>
            <p onClick={setClickFilter(ratingParam)}>3+ Stars</p>
            <p onClick={setClickFilter(ratingParam)}>3.5+ Stars</p>
            <p onClick={setClickFilter(ratingParam)}>4+ Stars</p>
            <p onClick={setClickFilter(ratingParam)}>4.5+ Stars</p>
          </div>
        </div>
        <div className="dropdown">
          <p class="filter-label">Year&nbsp;{down}</p>
          <div className="dropdown-content input">
            <input
              class="form-control"
              type="number"
              name="Min. Year"
              placeholder="Min. Year"
              onKeyUp={setInputFilter(minYearParam)}
            ></input>
            <p>to</p>
            <input
              class="form-control"
              type="number"
              name="Max. Year"
              placeholder="Max. Year"
              onKeyUp={setInputFilter(maxYearParam)}
            ></input>
          </div>
        </div>
        <div className="dropdown">
          <p class="filter-label">Price&nbsp;{down}</p>
          <div className="dropdown-content input">
            <input
              class="form-control"
              type="number"
              name="Min. Price"
              placeholder="Min. Price (USD)"
              onKeyUp={setInputFilter(minPriceParam)}
            ></input>
            <p>to</p>
            <input
              class="form-control"
              type="number"
              name="Max. Price"
              placeholder="Max. Price (USD)"
              onKeyUp={setInputFilter(maxPriceParam)}
            ></input>
          </div>
        </div>
      </div>
      {Object.keys(filterCriteria).length !== 0 ? (
        <FilterEntries>
          {Object.entries(filterCriteria).map(([key, value]) => (
            <ResultsCriteria key={key} name={key} value={value} />
          ))}
        </FilterEntries>
      ) : (
        ""
      )}
    </StyledResultsFilters>
  );
};

const StyledResultsFilters = styled(motion.div)`
  .filterOptions {
    display: flex;
    flex-wrap: wrap;
  }

  .dropdown {
    cursor: pointer;
    margin: 0.5rem 1rem 0.5rem 0;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
  }

  .dropdown:hover .filter-label {
    color: lightblue;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-content p:hover {
    background-color: lightblue;
    cursor: pointer;
  }

  .input p:hover {
    background-color: #f9f9f9;
    cursor: default;
  }

  button {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid white;
    margin-top: auto;
    margin-bottom: auto;
    background: none;
    cursor: pointer;
  }
`;

const FilterEntries = styled(motion.div)`
  display: flex;
`;

export default ResultsFilters;
