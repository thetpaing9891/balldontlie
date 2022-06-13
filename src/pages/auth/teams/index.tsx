import React from "react";
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete, MdMode } from "react-icons/md";
import { deleteTeam } from "../../../redux/action";
import { TeamType } from "../../../types";
import AlertDialogComponent from "../../../components/alertdialog";
import EditPopup from "../../../components/editpopup/index";

const TeamsIndex = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();

  const [selectedTeam, setSelectedTeam] = React.useState<
    TeamType | undefined
  >();

  const dispatch = useDispatch();
  const teams: TeamType[] = useSelector((state: any) => state.handlerTeam);

  const handleEdit = (team: TeamType) => {
    setSelectedTeam(team);
    modalOnOpen();
  };

  const handleDelete = (data: TeamType) => {
    setSelectedTeam(data);
    onOpen();
  };

  const submitDelete = () => {
    if (selectedTeam) {
      removeTeam(selectedTeam);
      toast({
        title: `${selectedTeam.name} team was deleted`,
        status: "info",
        isClosable: true,
      });
    }
    onClose();
  };
  const removeTeam = (item: TeamType) => {
    dispatch(deleteTeam(item));
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
                      <MdDelete
                        size={25}
                        color={"red"}
                        onClick={() => handleDelete(team)}
                        cursor="pointer"
                      />
                      <MdMode
                        size={25}
                        onClick={() => handleEdit(team)}
                        cursor="pointer"
                      />
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

      <AlertDialogComponent
        isOpen={isOpen}
        onClose={onClose}
        selectedTeam={selectedTeam}
        submitDelete={submitDelete}
      />

      <EditPopup
        modalIsOpen={modalIsOpen}
        modalOnClose={modalOnClose}
        selectedTeam={selectedTeam}
        teams={teams}
        isUpdate={true}
      />
    </Container>
  );
};

export default TeamsIndex;
