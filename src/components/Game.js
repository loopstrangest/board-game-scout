//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faHourglassHalf,
  faCalendarDay,
  faDollarSign,
  faStar as fullStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

const Game = ({
  name,
  rating,
  year,
  minPlayers,
  maxPlayers,
  minTime,
  maxTime,
  price,
  url,
  image,
  count,
  numSearchMechanics,
  matchedMechanics,
}) => {
  //use fontawesomeicons
  const users = <FontAwesomeIcon icon={faUsers} />;
  const time = <FontAwesomeIcon icon={faHourglassHalf} />;
  const calendar = <FontAwesomeIcon icon={faCalendarDay} />;
  const dollar = <FontAwesomeIcon icon={faDollarSign} />;
  const starFull = <FontAwesomeIcon icon={fullStar} />;
  const starEmpty = <FontAwesomeIcon icon={emptyStar} />;

  const formatPlaytime = () => {
    return minTime === maxTime
      ? minTime + " min"
      : minTime + "-" + maxTime + " min";
  };

  const formatPlayers = () => {
    return minPlayers === maxPlayers
      ? minPlayers
      : minPlayers + "-" + maxPlayers;
  };

  const getStars = () => {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(starFull);
      } else {
        stars.push(starEmpty);
      }
    }
    return stars;
  };

  const getMatchedMechanics = (matchedMechanics) => {
    const mechanicsList = [
      <p>
        <u>Matching Mechanics</u>
      </p>,
    ];
    matchedMechanics.forEach((mechanic) => {
      mechanicsList.push(<p>{mechanic}</p>);
    });
    return mechanicsList;
  };

  const followMouse = (e) => {
    e.target.nextSibling.style.left = e.pageX + 10 + "px";
    e.target.nextSibling.style.top = e.pageY + 10 + "px";
  };

  const openGamePage = () => {
    window.open(url);
  };
  return (
    <StyledGame onClick={openGamePage}>
      <h3>{name}</h3>
      {numSearchMechanics > 0 ? (
        <div class="match">
          <p onMouseMove={followMouse}>
            {Math.round((count / numSearchMechanics) * 100)}% Match
          </p>
          <div className="matched-mechanics">
            {getMatchedMechanics(matchedMechanics)}
          </div>
        </div>
      ) : (
        ""
      )}
      <p>
        {getStars()}&nbsp;{rating.toFixed(2)}/5
      </p>
      <p>
        {users}&nbsp;
        {formatPlayers()}
        &nbsp;&nbsp;
        {time}&nbsp;
        {formatPlaytime()}
        &nbsp;&nbsp;
        {calendar}&nbsp;{year}
        &nbsp;&nbsp;
        {dollar}&nbsp;{price}
      </p>
      <img src={image} alt={name} />
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  h3 {
    font-size: 24px;
  }
  cursor: pointer;
  min-height: 30vh;
  box-shadow: 0px 5px 20px lightblue;
  text-align: center;
  border-radius: 1rem;
  img {
    width: 100%;
    height: 40vh;
    object-fit: contain;
  }

  .match {
    display: inline-block;
  }

  .matched-mechanics {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
  }

  .match:hover > p {
    color: lightblue;
  }

  .match:hover > .matched-mechanics {
    display: block;
  }
`;

export default Game;
