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
  Image,
  IconButton,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ThreadCard } from "../features/home/component/thread-card";
import { useHomePage } from "../hooks/use-home-page";
import { RootState } from "../redux/store";
import { ChangeEvent, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";

export function CardBeranda() {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const { threads, BoxCSS, ButtonPost, onSubmit, register, handleSubmit } =
    useHomePage();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

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
              {/* <HStack> */}
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
                  w="475px"
                  placeholder="What is Happening?"
                  border="none"
                  color="white"
                  _active={{
                    border: "none",
                  }}
                  style={{ marginLeft: 20 }}
                />

                <Input
                  hidden
                  id="fileupload"
                  {...register("image")}
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {selectedImage && (
                  <Box mt={4} ml={"0x"} position="relative">
                    <Image
                      src={selectedImage}
                      alt="Preview"
                      maxWidth="100%" // Atur sesuai kebutuhan
                      borderRadius="md"
                      boxShadow="lg"
                    />
                    <IconButton
                      aria-label="Hapus gambar"
                      icon={<CloseIcon />}
                      position="absolute"
                      top="0"
                      borderRadius="full"
                      bg="#04A51E"
                      right="0"
                      m={2}
                      size="xs"
                      onClick={() => setSelectedImage(null)} // Fungsi untuk menghapus gambar
                    />
                  </Box>
                )}
                <Box
                  className="w-full"
                  display={"flex"}
                  justifyContent={"end"}
                  // borderTop={"1px solid grey"}
                >
                  <HStack>
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
                    <Button
                      position={"relative"}
                      top={2.5}
                      type="submit"
                      sx={ButtonPost}
                    >
                      Post
                    </Button>
                  </HStack>
                </Box>
              </form>
              {/* </HStack> */}
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
