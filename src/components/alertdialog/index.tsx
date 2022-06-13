import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { TeamType } from "../../types";

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTeam: TeamType | undefined;
  submitDelete: () => void;
}
const AlertDialogComponent = (props: AlertProps) => {
  const cancelRef = React.useRef() as any;
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete "{props.selectedTeam?.name}" Team
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={props.onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={props.submitDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
export default AlertDialogComponent;
