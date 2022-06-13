import { TeamType } from "../../../types";
import {
  Container,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { MdDelete, MdMode } from "react-icons/md";

const TeamsIndex = () => {
  const teams: TeamType[] = useSelector((state: any) => state.handlerTeam);
  return (
    <Container
      maxWidth={{ base: "auto", md: "container.lg" }}
      w={{ base: "100%", md: "container.lg" }}
      top={10}
      position={"relative"}
      as="main"
      mb={40}
    >
      <Heading as="h2" size="xl" mb={2}>
        Teams
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Team Name</Th>
              <Th isNumeric>Player Count</Th>
              <Th>Region</Th>
              <Th>Country</Th>
              <Th>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teams.length > 0 ? (
              teams.map((team: TeamType) => (
                <Tr key={team.id}>
                  <Td>{team.name}</Td>
                  <Td isNumeric>{team.player_count}</Td>
                  <Td>{team.region}</Td>
                  <Td>{team.country}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <MdDelete size={25} color={"red"} />
                      <MdMode size={25} />
                    </HStack>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={5}>No content is not available.</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TeamsIndex;
