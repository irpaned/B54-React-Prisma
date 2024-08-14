import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { useLoginForm } from "../hook/use-login-form";

export function LoginForm() {
  const { handleSubmit, onSubmit, register, errors, handleClick, show } =
    useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box m="auto" w="450px" p="10px 10px 10px 10px" mt="150px">
        <Heading fontSize="50px" color="brand.900">
          Circle
        </Heading>
        <Heading size="lg" mb="15px" color="brand.800">
          Login to Circle
        </Heading>

        <Input
          {...register("email")}
          placeholder="Email"
          sx={{
            "::placeholder": {
              color: "white",
            },
          }}
          size="md"
          mb="7px"
          borderColor="white"
          color="white"
        />
        <Text color={"red"}>{errors.email?.message}</Text>
        <InputGroup size="md" mt="7px" mb="10px">
          <Input
            {...register("password")}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Password"
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
        <Flex justifyContent="end" mb="10px">
          <Link href="/auth/reset" color="brand.800">
            Forgot password?
          </Link>
        </Flex>

        <Button
          isDisabled={!!(errors.email?.message || errors.password?.message)} // ini agar buttonnya gabisa di click ketika email dan password yg di isi tidak lolos validasi
          type="submit"
          w="100%"
          bg="brand.900"
          borderRadius="20px"
          mb="10px"
          color="white"
        >
          Login
        </Button>
        <Flex>
          <Text color="white">Don't have an account yet?</Text>
          <Link href="/auth/register" color="brand.900" ml="5px">
            Create Account
          </Link>
        </Flex>
      </Box>
    </form>
  );
}
