import { TeamType } from "../../types";

const team: TeamType[] = [];

const handlerTeam = (state = team, action: any) => {
  switch (action.type) {
    case "CREATE_TEAM":
      // If not exists, add new team
      return [...state, { ...action.payload }];

    case "DELETE_TEAM":
      // If not exists, remove
      return state.filter((item) => item.id !== action.payload.id);
    case "UPDATE_TEAM":
      // If not exists, update
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
    case "CLEAR_TEAM":
      return (state = []);
    default:
      return state;
  }
};

export default handlerTeam;
