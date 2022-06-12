import * as React from "react";
import {
  Avatar,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { IoCaretDown } from "react-icons/io5";
import { useAuthStorage } from "../../../../utils/authStorage";

const ProfileMenu = () => {
  const { getAuth, logout } = useAuthStorage();
  const auth = getAuth();
  const accountName = auth?.data.name;

  return (
    <Menu>
      <Tooltip label={accountName}>
        <MenuButton
          as={Button}
          variant="ghost"
          size="xl"
          rightIcon={<IoCaretDown />}
          px="1"
        >
          <HStack>
            <Avatar size="md" name={accountName} src="" />
            <Text maxWidth="150px" fontWeight="500" fontSize="14px">
              {accountName}
            </Text>
          </HStack>
        </MenuButton>
      </Tooltip>
      <MenuList>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
