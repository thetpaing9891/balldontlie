import { ReactNode } from "react";
import {
  Grid,
  HStack,
  Image,
  Stack,
  Link,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import * as React from "react";
import ProfileMenu from "./profile/index";
import { useNavigate } from "react-router-dom";

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export const AuthorizedHeader = (props: any) => {
  const navigate = useNavigate();
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <HStack
      height="full"
      w="full"
      boxShadow="md"
      p={8}
      justifyContent="space-between"
    >
      <Image width="166px" height="60px" src="../../logo.svg" />
      <Grid placeItems="center" height="full" px="4" borderColor="gray.200">
        <Stack direction={"row"} spacing={4}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <NavLink>Players</NavLink>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link
                  onClick={() => navigate("/admin/teams")}
                  p={2}
                  fontWeight={500}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  Teams
                </Link>
              </PopoverTrigger>

              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  <DesktopSubNav name="Create" onOpen={props.onOpen} />
                </Stack>
              </PopoverContent>
            </Popover>
          </HStack>
        </Stack>
      </Grid>
      <ProfileMenu />
    </HStack>
  );
};

const DesktopSubNav = ({ name, onOpen }: any) => {
  return (
    <Link
      href={"#"}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text onClick={onOpen}>{name}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        ></Flex>
      </Stack>
    </Link>
  );
};
