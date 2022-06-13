import React from "react";
import {
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
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { TeamType } from "../../types";
import useForm from "../../hooks/forms/useForm";
import { useDispatch } from "react-redux";
import { updateTeam } from "../../redux/action/index";

interface EditPopupProps {
  modalIsOpen: boolean;
  modalOnClose: () => void;
  selectedTeam: TeamType | undefined;
  teams: TeamType[];
  isUpdate: boolean | undefined;
}

const EditPopup = (props: EditPopupProps) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const initialRef = React.useRef(null) as any;
  const finalRef = React.useRef(null) as any;

  const handleUpdateSubmit = () => {
    const data: TeamType = {
      id: values.id,
      name: values.name,
      player_count: values.player_count,
      region: values.region,
      country: values.country,
    };
    updateTeamById(data);
    props.modalOnClose();
    toast({
      title: `${values.name} has been updated`,
      status: "success",
      isClosable: true,
    });
  };

  const updateTeamById = (item: TeamType) => {
    dispatch(updateTeam(item));
  };

  const { handleChange, values, errors, handleSubmit } = useForm(
    handleUpdateSubmit,
    props.teams,
    props.isUpdate,
    props.selectedTeam
  );

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={props.modalIsOpen}
      onClose={props.modalOnClose}
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
              value={values?.name}
              name="name"
              onChange={handleChange}
            />
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
              id="player_count"
              type="number"
              value={values?.player_count}
              name="player_count"
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
              value={values?.region}
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
              value={values?.country}
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
          <Button colorScheme="blue" onClick={handleSubmit}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPopup;
