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
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Player, TeamType } from "../../types";

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  teams: TeamType[];
  player: Player;
  handlePickUp: (player: Player, teamId: string) => void;
}

const TeamPopup = (props: PopupFormProps) => {
  const [teamId, setTeamId] = React.useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeamId(e.target.value);
  };

  const handleSubmit = () => {
    if (teamId) {
      props.handlePickUp(props.player, teamId);
      props.onClose();
    }
  };
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={1}>
            <FormLabel htmlFor="country">
              Player Name :{" "}
              <strong>
                {props.player.first_name} {props.player.last_name}
              </strong>
            </FormLabel>
          </FormControl>
          <FormControl mb={1}>
            <FormLabel htmlFor="country">
              Select Team <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Select placeholder="Select option" onChange={handleChange}>
              {props.teams.map((team: TeamType) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            colorScheme="blue"
            w={"full"}
            disabled={!teamId && true}
            onClick={handleSubmit}
          >
            Pick Up
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default TeamPopup;
