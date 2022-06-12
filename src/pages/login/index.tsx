import React from "react";
import {
  VStack,
  Image,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { PasswordInput } from "../../components/password/PasswordInput";
import { setAuth } from "../../utils/authStorage";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../../types";
import { v4 as uuidv4 } from "uuid";

const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [validationError, setValidationError] = React.useState({
    userName: "",
    password: "",
  });

  const validateBody = React.useCallback(() => {
    const error = {
      userName: "",
      password: "",
    };
    if (!userName) {
      error.userName = "User name is required";
    }
    if (!password) {
      error.password = "Password is required";
    }
    return error;
  }, [userName, password]);

  const handleSubmit = () => {
    const error = validateBody();
    if (error.userName || error.password) {
      setValidationError(error);
    } else {
      setValidationError({
        userName: "",
        password: "",
      });

      const data: AuthResponse = {
        data: {
          name: userName,
          token: uuidv4(),
        },
      };
      setAuth(data);
      navigate("/admin");
    }
  };

  console.log("Valide errors", validationError.userName);

  return (
    <VStack spacing="8">
      <VStack
        width="clamp(300px, 460px, 460px)"
        height="clamp(300px, 100%, 511px)"
        background="white"
        border="1px solid"
        borderColor="#E6F0F8"
        borderRadius="md"
        px="10"
        py="6"
        alignItems="flex-start"
        spacing="6"
      >
        <Image width="166px" height="60px" src="/logo.svg" />

        <Heading
          color={"#000"}
          sx={{
            WebkitBackgroundClip: "text",
          }}
          fontSize="x-large"
        >
          Login to your Account
        </Heading>

        <FormControl>
          <FormLabel fontSize="lg">Username</FormLabel>
          <Input
            type="text"
            pattern="[0-9]{6,6}"
            variant="aui"
            rounded="4px"
            isRequired
            value={userName}
            onChange={(e) => {
              setValidationError({ ...validationError, userName: "" });
              setUserName(e.target.value);
            }}
          />
          {validationError.userName && (
            <Text color={"red"} mt={1}>
              Username is required
            </Text>
          )}
        </FormControl>

        <FormControl>
          <FormLabel fontSize="lg">Password</FormLabel>
          <VStack alignItems="flex-start" spacing="2">
            <PasswordInput
              variant="aui"
              rounded="4px"
              isRequired
              value={password}
              onChange={(e) => {
                setValidationError({ ...validationError, password: "" });
                setPassword(e.target.value);
              }}
            />
            {validationError.password && (
              <Text color={"red"} mt={1}>
                Password is required
              </Text>
            )}
            <Button variant="link" fontWeight="500" colorScheme="red">
              Forgot Password?
            </Button>
          </VStack>
        </FormControl>

        <Button
          type="submit"
          size="lg"
          shadow="md"
          borderRadius="base"
          colorScheme="brand"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </VStack>

      <Text color="#848484" fontSize="14px" textAlign="center">
        Copyright &copy; Codigo - Mobile App Developer Singapore
      </Text>
    </VStack>
  );
};

export default Login;
