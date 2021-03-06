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
import useForm from "../../hooks/forms/useForm";

const PopupForm = (props: any) => {
  //Final submit function
  const createForm = () => {
    const data: TeamType = {
      id: uuidv4(),
      name: values.name,
      player_count: values.playerCount,
      region: values.region,
      country: values.country,
    };
    dispatch(createTeam(data));
    props.onClose();
    toast({
      title: `${values.name} has been created`,
      status: "success",
      isClosable: true,
    });
  };

  //Custom hook call

  const toast = useToast();
  const dispatch = useDispatch();
  const teams: TeamType[] = useSelector((state: any) => state.handlerTeam);

  const { handleChange, values, errors, handleSubmit } = useForm(
    createForm,
    teams,
    false
  );

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
            <Input id="name" type="name" name="name" onChange={handleChange} />
            {errors.name && (
              <Text color={"red"} mt={1}>
                {errors.name}
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
              name="playerCount"
              onChange={handleChange}
            />
            {errors.playerCount && (
              <Text color={"red"} mt={1}>
                {errors.playerCount}
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
              name="region"
              onChange={handleChange}
            />
            {errors.region && (
              <Text color={"red"} mt={1}>
                {errors.region}
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
              name="country"
              onChange={handleChange}
            />
            {errors.country && (
              <Text color={"red"} mt={1}>
                {errors.country}
              </Text>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default PopupForm;
