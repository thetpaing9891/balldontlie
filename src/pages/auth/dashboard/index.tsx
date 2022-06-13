import { Container, useBreakpointValue, SimpleGrid } from "@chakra-ui/react";
import PlayerItem from "../../../components/players/player";
import { usePlayersInfiniteQuery } from "../../../hooks/query/usePlayersQuery";
import { Player, PlayerType, requestParams, TeamType } from "../../../types";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { createPlayer, deletePlayer } from "../../../redux/action/index";
import { v4 as uuidv4 } from "uuid";

const params: requestParams = {
  page: 1,
  per_page: 12,
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const columns = useBreakpointValue({ base: 1, md: 3 });
  let pageLength = 12;
  const data = usePlayersInfiniteQuery(params);

  const teams: TeamType[] = useSelector((state: any) => state.handlerTeam);
  const players: PlayerType[] = useSelector(
    (state: any) => state.handlerPlayer
  );

  const handlePickUp = (player: Player, teamId: string) => {
    const team: any = teams.find((team: TeamType) => team.id === teamId);
    const data: PlayerType = {
      id: uuidv4(),
      player: player,
      team: team,
    };
    dispatch(createPlayer(data));
  };

  const removePickUp = (id: string) => {
    dispatch(deletePlayer(id));
  };

  return (
    <Container
      maxWidth={{ base: "auto", md: "container.lg" }}
      w={{ base: "100%", md: "container.lg" }}
      top={10}
      position={"relative"}
      as="main"
      mb={40}
    >
      {data.isSuccess && (
        <InfiniteScroll
          dataLength={data.data.pages.length * pageLength}
          next={data.fetchNextPage} //To put endMessage and loader to the top.
          hasMore={true}
          loader={<p></p>}
          scrollableTarget="scrollableDiv"
        >
          <SimpleGrid columns={columns} spacing={8}>
            {data?.data.pages.map((page) =>
              page.results.map((player: Player) => (
                <PlayerItem
                  key={player.id}
                  player={player}
                  teams={teams}
                  players={players}
                  handlePickUp={handlePickUp}
                  removePickUp={removePickUp}
                />
              ))
            )}
          </SimpleGrid>
        </InfiniteScroll>
      )}
      {data.isFetching && (
        <SimpleGrid columns={columns} spacing={8} mt={4}>
          <Skeleton height={350} />
          <Skeleton height={350} />
          <Skeleton height={350} />
        </SimpleGrid>
      )}
    </Container>
  );
};
export default Dashboard;
