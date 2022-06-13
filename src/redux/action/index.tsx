import { TeamType } from "../../types";

export const createTeam = (team: TeamType) => {
  return {
    type: "CREATE_TEAM",
    payload: team,
  };
};

// Delete Item from Store
export const deleteTeam = (team: TeamType) => {
  return {
    type: "DELETE_TEAM",
    payload: team,
  };
};

// Update Item from Store
export const updateTeam = (team: TeamType) => {
  return {
    type: "UPDATE_TEAM",
    payload: team,
  };
};

export const clearCart = (team: TeamType[]) => {
  return {
    type: "CLEAR_TEAM",
    payload: team,
  };
};
