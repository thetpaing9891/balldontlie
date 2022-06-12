import React from "react";
import { ScreenWrapper } from "./ScreenWrapper";
import { Grid } from "@chakra-ui/react";
import { useAuthStorage } from "../../utils/authStorage";
import { useLocation, useNavigate } from "react-router-dom";

const UnAuthorizedLayout = ({ children }: any): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const { getAuth, logout } = useAuthStorage();
  const auth = getAuth();

  React.useEffect(() => {
    if (auth) navigate("/admin");
  }, [auth, location.pathname, logout, navigate]);

  return (
    <ScreenWrapper>
      <Grid
        placeItems="center"
        background="background"
        width="clamp(100vw, 100%, 100vw)"
        height="clamp(100vh, 100vh, 100vh)"
      >
        {children}
      </Grid>
    </ScreenWrapper>
  );
};
export default UnAuthorizedLayout;
