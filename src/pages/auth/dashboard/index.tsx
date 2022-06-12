import React from "react";
import { Container, useBreakpointValue, SimpleGrid } from "@chakra-ui/react";
import PlayerItem from "../../../components/players/player";
import { usePlayersInfiniteQuery } from "../../../hooks/query/usePlayersQuery";
import { Player, requestParams } from "../../../types";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const params: requestParams = {
  page: 1,
  per_page: 12,
};

const Dashboard = () => {
  const columns = useBreakpointValue({ base: 1, md: 3 });
  let pageLength = 12;
  const data = usePlayersInfiniteQuery(params);

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
                <PlayerItem key={player.id} player={player} />
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
