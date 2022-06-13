import { PlayerType } from "../../types";

const player: PlayerType[] = [];

const handlerPlayer = (state = player, action: any) => {
  switch (action.type) {
    case "CREATE_PLAYER":
      // If not exists, add new team
      return [...state, { ...action.payload }];

    case "DELETE_PLAYER":
      // If not exists, remove
      return state.filter((player) => player.id !== action.payload);
    case "DELETE_PLAYER_BYTEAM":
      return state.filter((player) => player.team.id !== action.payload);
    case "CLEAR_TEAM":
      return (state = []);
    default:
      return state;
  }
};

export default handlerPlayer;
