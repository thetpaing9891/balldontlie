import { requestParams } from '../../types';
import { apiClient } from '../adapters/apiClient';

// Get the players 
export async function getPlayers( data : requestParams){
    return await apiClient.get(
        "/players",
        { 
            params : data,
        }
      );
}





