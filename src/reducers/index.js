import { combineReducers } from "redux";
import gamesReducer from "./gamesReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  games: gamesReducer,
  app: appReducer,
});

export default rootReducer;
