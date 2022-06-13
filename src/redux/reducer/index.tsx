import { combineReducers } from "redux";
import handlerTeam from "./handlerTeam";
import handlerPlayer from "./handlerPlayer";

const rootReducers = combineReducers({
  handlerTeam,
  handlerPlayer,
});

export default rootReducers;
