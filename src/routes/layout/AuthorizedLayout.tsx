import React from "react";
import { ScreenWrapper } from "./ScreenWrapper";
import { AuthorizedHeader } from "../../pages/layouts/header/index";
import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { useAuthStorage } from "../../utils/authStorage";
import { useLocation } from "react-router-dom";
import PopupForm from "../../components/popup";

const AuthorizedLayout = ({ children }: any) => {
  const location = useLocation();

  const { getAuth, logout } = useAuthStorage();
  const auth = getAuth();

  React.useEffect(() => {
    if (auth === null && location.pathname) logout();
  }, [auth, location.pathname, logout]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ScreenWrapper>
      <Grid
        height="clamp(100vh, 100vh, auto)"
        placeItems="stretch"
        background="#fff"
      >
        <AuthorizedHeader isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </Grid>
      <Grid>
        <GridItem as="main" px={6} py={9}>
          {children}
        </GridItem>
      </Grid>
      <PopupForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </ScreenWrapper>
  );
};
export default AuthorizedLayout;
