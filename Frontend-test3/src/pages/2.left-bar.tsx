import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import { BiSolidHomeSmile } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaImage, FaRegHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { useHomePage } from "../hooks/use-home-page";
import { Link } from "react-router-dom";

export function LeftBar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "auth/login";
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { ButtonPost, onSubmit, register, handleSubmit } = useHomePage();

  const CssDivFlex = {
    mb: 5,
  };

  const IconCss = {
    fontSize: 30,
  };

  const HeadingCss = {
    color: "brand.900",
    fontSize: 50,
  };

  return (
    <>
      <Box bg="black" w="400px" h="100%" color="white" p="20px 0 0 150px" m={0}>
        <Heading as="h1" sx={HeadingCss}>
          Circle
        </Heading>

        <Box mt="5">
          <Flex sx={CssDivFlex}>
            <HStack>
              <Link to="/">
                <Icon sx={IconCss} as={BiSolidHomeSmile} />
              </Link>
              <Link
                to="/"
                style={{ fontSize: 20 }}
                // sx={LinkCss}
              >
                Home
              </Link>
            </HStack>
          </Flex>
          <Flex sx={CssDivFlex}>
            <HStack>
              <Link to="/search">
                <Icon sx={IconCss} as={IoSearch} />
              </Link>
              <Link to="/search" style={{ fontSize: 20 }}>
                Search
              </Link>
            </HStack>
          </Flex>
          <Flex sx={CssDivFlex}>
            <HStack>
              <Icon sx={IconCss} as={FaRegHeart} />
              <Link style={{ fontSize: 20 }} to="#">
                Follow
              </Link>
            </HStack>
          </Flex>
          <Flex sx={CssDivFlex}>
            <HStack>
              <Link to="/profile">
                <Icon sx={IconCss} as={CgProfile} />
              </Link>
              <Link
                to="/profile"
                style={{ fontSize: 20 }}
                // sx={LinkCss}
              >
                Profile
              </Link>
            </HStack>
          </Flex>
        </Box>

        <Button
          onClick={onOpen}
          bg={"brand.900"}
          color={"brand.800"}
          w={"200"}
          borderRadius={"30"}
          fontSize={"20"}
          height={"50"}
          width={"225px"}
          // p={'3px 10px 5px 10px'}
          sx={ButtonPost}
        >
          Create Post
        </Button>

        <Button
          onClick={handleLogout}
          borderRadius={"20"}
          color={"white"}
          _hover={{
            bg: "white",
            color: "black",
          }}
          _active={{
            color: "black",
            bg: "#ACACAC",
          }}
          bg={"black"}
          mt={"60"}
        >
          <HStack>
            <Icon fontSize={25} as={TbLogout2} />
            <Text mb="2px">Log Out</Text>
          </HStack>
        </Button>
      </Box>

      {/* modal create post */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          boxShadow={"0 0 7px 1px rgba(255, 255, 255, 0.5)"}
          bg="black"
          color={"white"}
          borderRadius={"10px"}
        >
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody h={"20"}>
            <FormControl mb={0}>
              <Textarea
                {...register("content")}
                border="1px solid #8E8E8E"
                placeholder="What is happening?"
                resize={"none"}
              />
            </FormControl>
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
            <FormControl>
              <Input
                hidden
                id="fileupload"
                {...register("image")}
                border="1px solid #8E8E8E"
                type="file"
                accept="image/*"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              sx={ButtonPost}
              variant="ghost"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
