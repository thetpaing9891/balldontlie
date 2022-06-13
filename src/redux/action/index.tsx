import { TeamType, PlayerType } from "../../types";

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

// Create Player

export const createPlayer = (player: PlayerType) => {
  return {
    type: "CREATE_PLAYER",
    payload: player,
  };
};

// Delete Item from Store
export const deletePlayer = (id: string) => {
  return {
    type: "DELETE_PLAYER",
    payload: id,
  };
};

// Delete Item from Store
export const deletePlayerByTeamID = (id: string) => {
  return {
    type: "DELETE_PLAYER_BYTEAM",
    payload: id,
  };
};
