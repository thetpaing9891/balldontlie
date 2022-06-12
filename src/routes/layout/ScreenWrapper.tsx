import { Container } from "@chakra-ui/react";
import * as React from "react";

export const ScreenWrapper = ({ children }: any) => {
  return <Container maxWidth="container.3xl">{children}</Container>;
};
