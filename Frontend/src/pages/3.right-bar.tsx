import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// import { UserSearch } from "../features/search/types/search";
// import { api } from "../libraries/api";
import { EditProfile } from "../hooks/use-edit-profile";
import { SuggestCard } from "../features/suggest/component/suggest-card";
import { useSuggest } from "../hooks/use-suggest";

export function RightBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { handleSubmit, onSubmit, register, errors } = EditProfile(
    currentUser.id
  );

  const { suggests } = useSuggest();
  console.log("ini suggest", suggests);

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

  const ButtonPost = {
    bg: "brand.900",
    color: "white",
    borderRadius: 30,
    p: "0px 15px 1px 15px",
    ":hover": {
      bg: "white",
      color: "black",
    },
    ":active": {
      color: "black",
      bg: "#ACACAC",
    },
  };

  return (
    <Box bg="black" w="400px" h="100%" color="white" p="20px 15px 0 20px" m={0}>
      <Card
        bg="black"
        color="white"
        border="1px solid rgb(47, 51, 54)"
        borderRadius="20px"
      >
        <CardHeader>
          <Heading size="md">My Profile</Heading>
        </CardHeader>

        <CardBody paddingTop="0">
          <Box w="100%" h="80px" borderRadius="10px" overflow="hidden">
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
              sx={ButtonPost}
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
                  {/* <form onSubmit={editProfile}> */}
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
              <Text marginRight="4px">{currentUser.TotalFollowers}</Text>
              <Text color="grey">Followers</Text>
              <Text marginLeft="10px">{currentUser.TotalFolloweds}</Text>
              <Text marginLeft="4px" color="grey">
                Following
              </Text>
            </Box>
          </Box>
        </CardBody>
      </Card>

      <Card
        overflow={"scroll"}
        height={"300px"}
        bg="black"
        color="white"
        border="1px solid rgb(47, 51, 54)"
        borderRadius="20px"
        mt="15px"
        sx={scrollbar}
      >
        <CardHeader>
          <Heading size="md">Suggested for you</Heading>
        </CardHeader>
        {suggests?.map((suggest) => (
          <SuggestCard suggest={suggest} />
        ))}
      </Card>
    </Box>
  );
}
