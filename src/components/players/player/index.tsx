import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  HStack,
  Button,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Player, TeamType, PlayerType } from "../../../types";
import TeamPopup from "../../teampopup/index";

interface PlayerCardProps {
  player: Player;
  teams: TeamType[];
  players: PlayerType[];
  handlePickUp: (player: Player, teamId: string) => void;
  removePickUp: (id: string) => void;
}

const PlayerItem = (props: PlayerCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isSelected = props.players.find(
    (item) => item.player.id === props.player.id
  );
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={"../../../profile.svg"}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {props.player.first_name} {props.player.last_name}
        </Heading>

        <Stack direction={"row"} justify={"center"} spacing={6}>
          <Stack spacing={0} align={"center"}>
            <Text fontSize={"sm"} color={"gray.500"}>
              Position
            </Text>
            <Text fontWeight={600}>{props.player.position}</Text>
          </Stack>
          <Stack spacing={0} align={"center"}>
            <Text fontSize={"sm"} color={"gray.500"}>
              Height
            </Text>
            <Text fontWeight={600}>{props.player.height_inches}</Text>
          </Stack>
        </Stack>

        {isSelected && (
          <>
            <Stack direction={"row"} justify={"center"} spacing={6}>
              <Stack spacing={0} align={"center"}>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Team Name
                </Text>
                <Text fontWeight={600}>{isSelected.team.name}</Text>
              </Stack>
            </Stack>

            <Stack direction={"row"} justify={"center"} spacing={6}>
              <Stack spacing={0} align={"center"}>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Country
                </Text>
                <Text fontWeight={600}>{isSelected.team.country}</Text>
              </Stack>
            </Stack>
          </>
        )}

        <HStack mt={8} spacing={4}>
          {!isSelected ? (
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
              onClick={onOpen}
            >
              Select
            </Button>
          ) : (
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"red.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "red.500",
              }}
              _focus={{
                bg: "red.500",
              }}
              onClick={() => props.removePickUp(isSelected.id)}
            >
              Remove
            </Button>
          )}
        </HStack>
      </Box>

      <TeamPopup
        isOpen={isOpen}
        player={props.player}
        onClose={onClose}
        teams={props.teams}
        handlePickUp={props.handlePickUp}
      />
    </Center>
  );
};

export default PlayerItem;
