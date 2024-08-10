import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  WrapItem,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ThreadCard } from "../features/home/component/thread-card";
import { useHomePage } from "../hooks/use-home-page";
import { RootState } from "../redux/store";

export function CardBeranda() {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const { threads, BoxCSS, ButtonPost, onSubmit, register, handleSubmit } =
    useHomePage();

  const scrollbar = {
    "overflow-x": "hidden",
    "::-webkit-scrollbar": {
      width: "10px",
    },
    "::-webkit-scrollbar-track": {
      border: "7px solid black",
    },
    "::-webkit-scrollbar-thumb": {
      background: "linear-gradient(transparent,green)",
      borderRadius: "6px",
    },
  };

  return (
    <>
      <Box
        overflow="scroll"
        sx={scrollbar}
        w="600px"
        m="0"
        bg="black"
        h="703px"
        border="1px solid rgb(47, 51, 54)"
        borderTop="none"
        borderBottom="none"
        paddingTop="10px"
      >
        <Box sx={BoxCSS}>
          <Heading bg="black" color="white">
            Home
          </Heading>
          <Box sx={BoxCSS}>
            <Flex bg="black" mt="0">
              <HStack>
                <WrapItem>
                  <Avatar
                    size="md"
                    name="Ryan Florence"
                    src={currentUser.photoProfile}
                  />{" "}
                </WrapItem>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    {...register("content")}
                    w="360px"
                    placeholder="What is Happening?"
                    border="none"
                    color="white"
                    _active={{
                      border: "none",
                    }}
                  />

                  <label htmlFor="fileupload">
                    <Icon
                      cursor={"pointer"}
                      position={"relative"}
                      top={2.5}
                      paddingLeft={"5px"}
                      color="brand.900"
                      fontSize={35}
                      ml={"5px"}
                      _hover={{
                        color: "white",
                      }}
                      as={FaImage}
                    />
                  </label>

                  <Input
                    hidden
                    id="fileupload"
                    {...register("image")}
                    type="file"
                    w="380px"
                    border="none"
                    color="white"
                  ></Input>
                  <Button
                    position={"relative"}
                    bottom={"1"}
                    ml="8px"
                    type="submit"
                    sx={ButtonPost}
                  >
                    Post
                  </Button>
                </form>
              </HStack>
            </Flex>
          </Box>
          {threads?.map((thread) => (
            <ThreadCard thread={thread} />
          ))}
        </Box>
      </Box>
    </>
  );
}
