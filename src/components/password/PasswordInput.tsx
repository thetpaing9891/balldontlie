import * as React from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const PasswordInput: React.FC<Omit<InputProps, "type" | "pr">> = (
  props
) => {
  const [show, setShow] = React.useState(false);

  return (
    <InputGroup size="md">
      <Input pr="4.5rem" type={show ? "text" : "password"} {...props} />
      <InputRightElement width="4.5rem" height="100%">
        <IconButton
          aria-label={show ? "Hide password" : "Show password"}
          variant="ghost"
          icon={show ? <FiEye /> : <FiEyeOff />}
          size="sm"
          onClick={() => setShow(!show)}
        />
      </InputRightElement>
    </InputGroup>
  );
};
