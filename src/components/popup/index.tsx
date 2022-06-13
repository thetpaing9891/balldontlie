import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createTeam } from "../../redux/action";
import { TeamType } from "../../types";
import { v4 as uuidv4 } from "uuid";

const PopupForm = (props: any) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const teams: TeamType[] = useSelector((state: any) => state.handlerTeam);

  const [name, setName] = React.useState("");
  const [playerCount, setPlayerCount] = React.useState<number>(0);
  const [region, setRegion] = React.useState("");
  const [country, setCountry] = React.useState("");

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
      teams.filter((team: TeamType) => team.name === name).length > 0 &&
        (error.isExit = true);
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
  }, [name, playerCount, region, country, teams]);

  const handleSubmit = (e: any) => {
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
        id: uuidv4(),
        name,
        player_count: playerCount,
        region,
        country,
      };
      dispatch(createTeam(data));
      props.onClose();
      toast({
        title: `${name} has been created`,
        status: "success",
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Team</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={1}>
            <FormLabel htmlFor="name">
              Team name <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Input
              id="name"
              type="name"
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
          <Button colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default PopupForm;
