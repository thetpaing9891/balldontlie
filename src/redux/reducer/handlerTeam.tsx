import { TeamType } from "../../types";

const team: TeamType[] = [];

const handlerTeam = (state = team, action: any) => {
  switch (action.type) {
    case "CREATE_TEAM":
      // If not exists, add new team
      return [...state, { ...action.payload }];

    case "DELETE_TEAM":
      // If not exists, remove
      return state.map((item) => (item.id === action.payload.id ? [] : item));

    case "CLEAR_TEAM":
      return (state = []);
    default:
      return state;
  }
};

export default handlerTeam;
