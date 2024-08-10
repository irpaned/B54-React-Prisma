import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import { useResetPasswordForm } from "../hook/use-reset-password";

// interface ResetFormProps extends BoxProps {}

// type ResetForm = {
//   newPassword: string;
//   password: string;
// };

export function ResetPasswordForm() {
  const { handleClick, handleSubmit, errors, onSubmit, register, show } =
    useResetPasswordForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box m="auto" w="450px" p="10px 10px 10px 10px" mt="150px">
        <Heading fontSize="50px" color="brand.900">
          Circle
        </Heading>
        <Heading size="lg" mb="5px" color="brand.800">
          Reset Password
        </Heading>
        {/* <Text color="white">Enter your email first</Text> */}

        <InputGroup size="md" mt="7px" mb="7px">
          <Input
            {...register("email")}
            type={show ? "text" : "email"}
            pr="4.5rem"
            placeholder="Your email"
            sx={{
              "::placeholder": {
                color: "white",
              },
            }}
            color="white"
          />
        </InputGroup>
        <InputGroup size="md" mt="7px" mb="7px">
          <Input
            {...register("password")}
            type={show ? "text" : "password"}
            pr="4.5rem"
            placeholder="New password"
            sx={{
              "::placeholder": {
                color: "white",
              },
            }}
            color="white"
          />

          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              borderRadius="20px"
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Text color={"red"}>{errors.password?.message}</Text>
        <Button
          isDisabled={!!(errors.password?.message || errors.password?.message)}
          type="submit"
          w="100%"
          bg="brand.900"
          borderRadius="20px"
          mt="7px"
          mb="10px"
          color="white"
        >
          Submit
        </Button>
      </Box>
    </form>
  );
}
