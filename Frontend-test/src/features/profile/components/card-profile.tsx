import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Link,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { EditProfile } from "../../../hooks/use-edit-profile";

export function Profile() {
  // ini mas cundus coba apakah tombol submitnya jalan
  // const editProfile = (event : any) => {
  //   event.preventDefault()
  //   console.log("menjalakan submit");
  // }

  const { isOpen, onOpen, onClose } = useDisclosure();

  // ini dari redux
  const currentUser = useSelector((state: RootState) => state.auth.user);
  console.log(currentUser);

  const { handleSubmit, onSubmit, register, errors } = EditProfile(
    currentUser.id
  );

  const BoxCSSTop = {
    border: "1px solid rgb(47, 51, 54)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    // borderBottom : "none",
    p: "0px 15px 20px 15px",
  };

  return (
    <Box sx={BoxCSSTop}>
      <Flex h="60px">
        <HStack>
          <Link mt="0" href="http://localhost:5173/home" fontSize="45px">
            <Icon mt="5" as={IoIosArrowRoundBack}></Icon>
          </Link>
          <Heading fontSize="30px">{currentUser.fullName}</Heading>
        </HStack>
      </Flex>

      <Box mt="10px">
        <Box w="100%" h="120px" borderRadius="10px" overflow="hidden">
          <Image
            w="100%"
            h="100%"
            src="https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Dan Abramov"
          />
        </Box>

        <Box width="100&" h="65px" display="flex">
          <Avatar
            boxSize="4em"
            src={currentUser.photoProfile}
            position="relative"
            left="20px"
            bottom="35px"
            border="4px solid black"
          />
          <Spacer></Spacer>

          <Button
            color="white"
            onClick={onOpen}
            aria-label="Options"
            variant="outline"
            size="sm"
            borderRadius="20px"
            mt="10px"
            bg={"brand.900"}
            border={"none"}
            _hover={{
              color: "black",
              bg: "white",
            }}
            _active={{
              color: "black",
              bg: "#ACACAC",
            }}
          >
            Edit Profile
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
              color={"white"}
              bg={"black"}
              boxShadow={"0 0 7px 1px rgba(255, 255, 255, 0.5)"}
              borderRadius="20px"
            >
              <ModalHeader>Edit profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Card bg="black" color="white" borderRadius="20px">
                  <CardBody padding="0 0 0 0">
                    <Box
                      w="100%"
                      h="120px"
                      borderRadius="10px"
                      overflow="hidden"
                    >
                      <Image
                        w="100%"
                        h="100%"
                        src="https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Dan Abramov"
                      />
                    </Box>

                    <Box width="100&" h="65px" display="flex">
                      <Avatar
                        boxSize="4em"
                        bg={"grey"}
                        src={currentUser.photoProfile}
                        position="relative"
                        left="20px"
                        bottom="35px"
                        border="4px solid black"
                      />
                    </Box>
                  </CardBody>
                </Card>

                <FormControl>
                  <Input
                    {...register("fullName")}
                    defaultValue={currentUser.fullName}
                    border="1px solid #8E8E8E"
                    placeholder="Full Name"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <Input
                    {...register("userName")}
                    defaultValue={currentUser.userName}
                    border="1px solid #8E8E8E"
                    placeholder="Username"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <Textarea
                    {...register("bio")}
                    defaultValue={currentUser.bio}
                    placeholder="Bio"
                    height="30px"
                    resize={"none"}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  isDisabled={
                    !!(
                      errors.bio?.message ||
                      errors.fullName?.message ||
                      errors.userName?.message
                    )
                  }
                  bg={"brand.900"}
                  mr={3}
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  color={"white"}
                  _hover={{
                    color: "brand.800",
                    bg: "#039B1C",
                  }}
                  _active={{
                    bg: "#05831A",
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>

        <Box marginTop="-5">
          <Heading fontSize="25px">{currentUser.fullName}</Heading>
          <Text fontSize="md" color="grey">
            @{currentUser.userName}
          </Text>
          <Text>{currentUser.bio}</Text>
          <Box display="flex">
            <Text marginRight="4px">{currentUser.TotalFolloweds}</Text>
            <Text color="grey">Followers</Text>
            <Text marginLeft="10px">{currentUser.TotalFollowers}</Text>
            <Text marginLeft="4px" color="grey">
              Following
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
