import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";

import { useResetForm } from "../hook/use-reset-form";

// interface ResetFormProps extends BoxProps {}

// type ResetForm = {
//   newPassword: string;
//   password: string;
// };

export function ResetForm() {
  const { handleSubmit, errors, onSubmit, register } = useResetForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box m="auto" w="450px" p="10px 10px 10px 10px" mt="150px">
        <Heading fontSize="50px" color="brand.900">
          Circle
        </Heading>
        <Heading size="lg" mb="5px" color="brand.800">
          Reset Password
        </Heading>
        <Text color="white">Enter your email first</Text>

        <InputGroup size="md" mt="7px" mb="7px">
          <Input
            {...register("email")}
            pr="4.5rem"
            placeholder="Email"
            sx={{
              "::placeholder": {
                color: "white",
              },
            }}
            color="white"
          />
        </InputGroup>

        <Text color={"red"}>{errors.email?.message}</Text>
        <Button
          isDisabled={!!(errors.email?.message || errors.email?.message)}
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
