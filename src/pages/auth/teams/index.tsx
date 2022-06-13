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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormLabel,
  FormControl,
  Input,
  useDisclosure,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete, MdMode } from "react-icons/md";
import { deleteTeam, updateTeam } from "../../../redux/action";
import { TeamType } from "../../../types";

const TeamsIndex = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();

  const cancelRef = React.useRef() as any;
  const initialRef = React.useRef(null) as any;
  const finalRef = React.useRef(null) as any;

  const [selectedTeam, setSelectedTeam] = React.useState<TeamType>();
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [playerCount, setPlayerCount] = React.useState<number>(0);
  const [region, setRegion] = React.useState("");
  const [country, setCountry] = React.useState("");

  const dispatch = useDispatch();
  const teams: TeamType[] = useSelector((state: any) => state.handlerTeam);

  const handleEdit = (team: TeamType) => {
    setId(team.id);
    setName(team.name);
    setPlayerCount(team.player_count);
    setRegion(team.region);
    setCountry(team.country);
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

  const updateTeamById = (item: TeamType) => {
    dispatch(updateTeam(item));
  };

  const [validationError, setValidationError] = React.useState({
    name: "",
    isExit: false,
    playerCount: "",
    region: "",
    country: "",
  });

  const validateBody = React.useCallback(() => {
    const error = {
      name: "",
      isExit: false,
      playerCount: "",
      region: "",
      country: "",
    };
    if (!name) {
      error.name = "Team name is required";
    } else {
      teams.filter((team: TeamType) => team.name === name && team.id !== id)
        .length > 0 && (error.isExit = true);
    }
    if (!playerCount) {
      error.playerCount = "Player Count is required";
    }
    if (!region) {
      error.region = "Region is required";
    }
    if (!country) {
      error.country = "Country is required";
    }
    return error;
  }, [name, playerCount, region, country, teams, id]);

  const handleUpdateSubmit = (e: any) => {
    e.preventDefault();
    const error = validateBody();
    if (
      error.name ||
      error.playerCount ||
      error.region ||
      error.country ||
      error.isExit
    ) {
      setValidationError(error);
    } else {
      const data: TeamType = {
        id: id,
        name,
        player_count: playerCount,
        region,
        country,
      };
      updateTeamById(data);
      modalOnClose();
      toast({
        title: `${name} has been updated`,
        status: "warning",
        isClosable: true,
      });
    }
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

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete "{selectedTeam?.name}" Team
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={submitDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={modalIsOpen}
        onClose={modalOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={1}>
              <FormLabel htmlFor="name">
                Team name <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                id="name"
                type="name"
                value={name}
                onChange={(e) => {
                  setValidationError({ ...validationError, name: "" });
                  setName(e.target.value);
                }}
              />
              {validationError.name && (
                <Text color={"red"} mt={1}>
                  Team name is required
                </Text>
              )}
              {validationError.isExit && (
                <Text color={"red"} mt={1}>
                  Team name already exists
                </Text>
              )}
            </FormControl>
            <FormControl mb={1}>
              <FormLabel htmlFor="playerCount">
                Player count <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                id="playerCount"
                type="number"
                value={playerCount}
                onChange={(e: any) => {
                  const value: number = e.target.value as number;
                  setValidationError({ ...validationError, playerCount: "" });
                  setPlayerCount(value);
                }}
              />
              {validationError.playerCount && (
                <Text color={"red"} mt={1}>
                  Player count is required
                </Text>
              )}
            </FormControl>
            <FormControl mb={1}>
              <FormLabel htmlFor="region">
                Region <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                id="region"
                type="region"
                value={region}
                onChange={(e) => {
                  setValidationError({ ...validationError, region: "" });
                  setRegion(e.target.value);
                }}
              />
              {validationError.region && (
                <Text color={"red"} mt={1}>
                  Region is required
                </Text>
              )}
            </FormControl>
            <FormControl mb={1}>
              <FormLabel htmlFor="country">
                Country <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                id="country"
                type="country"
                value={country}
                onChange={(e) => {
                  setValidationError({ ...validationError, country: "" });
                  setCountry(e.target.value);
                }}
              />
              {validationError.country && (
                <Text color={"red"} mt={1}>
                  Country is required
                </Text>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateSubmit}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default TeamsIndex;
