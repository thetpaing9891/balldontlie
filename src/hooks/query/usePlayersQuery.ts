import { useInfiniteQuery } from "react-query";
import { requestParams } from '../../types';
import { getPlayers } from '../services';

export const getPlayerQK = () => ['getPlayers']

export function usePlayersInfiniteQuery( params : requestParams) {
   // Response from the API
   const  getPlayersList = async ({ pageParam = 1 }) => { 
        params.page = pageParam;
        console.log("Page params", params);

        const res = await getPlayers(params);
        const results = await res.data.data
        return {
            results,
            nextPage: pageParam + 1,
            totalPages: res.data.meta.total_count,
        }
   }
   // Request to the API
  return useInfiniteQuery( 
    ['players'], getPlayersList, {
        getNextPageParam: (lastPage, allPages) => {
            const maxPages = lastPage.totalPages / (params.per_page || 10)
            const nextPage = lastPage.nextPage
            console.log("Next Page", nextPage <= maxPages ? nextPage : undefined)
            return nextPage <= maxPages ? nextPage : undefined
          },
          enabled: true,
          retry: false,
    }
    )
}