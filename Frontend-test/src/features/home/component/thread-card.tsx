import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BiChat, BiShare } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { DeleteThread } from "../../../hooks/use-delete-thread";
import { EditThread } from "../../../hooks/use-edit-thread";
import { ThreadEntity } from "../entities/thread-entity";
import { useLike } from "../../../hooks/use-like-thread";

interface ThreadCardProps extends BoxProps {
  thread: ThreadEntity;
}

export function ThreadCard({ thread }: ThreadCardProps) {
  const { onDelete } = DeleteThread(thread.id);
  const { errors, handleSubmit, onSubmit, register } = EditThread(thread.id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleLikeThread } = useLike(thread.id);

  const BoxCSS = {
    border: "1px solid rgb(47, 51, 54)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    p: "20px 0px 20px 0px",
  };

  return (
    <>
      <Box sx={BoxCSS}>
        <Card maxW="100%" bg="black" color="white" padding="0 0 0 0">
          <CardHeader padding="0 0 0 0">
            <Flex letterSpacing={0.2}>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                  name={thread?.user?.fullName}
                  src={thread?.user?.photoProfile}
                />

                <Flex gap={2}>
                  <Heading size="sm">{thread?.user?.fullName}</Heading>
                  <Text color="grey">@{thread?.user?.userName}</Text>
                  <Text>{thread?.createdAt.toLocaleString()}</Text>
                </Flex>
              </Flex>

              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<BsThreeDots />}
                  variant="outline"
                  color={"white"}
                  border={"none"}
                  mt={"5px"}
                  _hover={{
                    color: "brand.900",
                  }}
                  _active={{
                    bg: "black",
                  }}
                />
                <MenuList
                  boxShadow={"0 0 7px 1px rgba(255, 255, 255, 0.5)"}
                  border={"none"}
                  bg={"black"}
                  p="10px 10px 10px 10px"
                  borderRadius={"10px"}
                >
                  <Button
                    justifyContent={"start"}
                    gap={2}
                    color={"white"}
                    fontWeight={"bold"}
                    fontSize={"15px"}
                    bg={"black"}
                    onClick={onDelete}
                    // onClick={onOpenDelete}
                    w="100%"
                    paddingLeft={"1.5"}
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "10px",
                    }}
                  >
                    <Icon as={RiDeleteBin5Line} fontSize={"18px"} />
                    <Text letterSpacing={0.5}>Delete</Text>
                  </Button>
                  <Button
                    justifyContent={"start"}
                    gap={2}
                    onClick={onOpen}
                    color={"white"}
                    fontWeight={"bold"}
                    fontSize={"15px"}
                    bg={"black"}
                    w="100%"
                    paddingLeft={"1.5"}
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "10px",
                    }}
                  >
                    <Icon as={MdOutlineModeEdit} fontSize={"18px"} />
                    <Text>Edit</Text>
                  </Button>
                </MenuList>
              </Menu>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent
                color={"white"}
                bg={"black"}
                boxShadow={"0 0 7px 1px rgba(255, 255, 255, 0.5)"}
                borderRadius="20px"
              >
                <ModalHeader>Edit Thread</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <Input
                      {...register("content")}
                      defaultValue={thread.content}
                      border="1px solid #8E8E8E"
                      placeholder="Content"
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    isDisabled={
                      !!(errors.content?.message || errors.image?.message)
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
          </CardHeader>
          <CardBody p="8px 0 8px 5px">
            <Text>{thread.content}</Text>
          </CardBody>
          <Image borderRadius="20px" objectFit="cover" src={thread.image} />

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
            paddingBottom="0px"
          >
            <Button
              onClick={handleLikeThread}
              color={thread.isLiked ? "red" : "white"}
              flex="1"
              variant="white"
              leftIcon={<FaRegHeart />}
            >
              {thread.TotalLikes}
            </Button>
            <Button flex="1" variant="white" leftIcon={<BiChat />}>
              {thread.TotalReplies}
            </Button>
          </CardFooter>
        </Card>
      </Box>
    </>
  );
}
