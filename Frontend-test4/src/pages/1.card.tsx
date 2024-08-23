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
} from "@chakra-ui/react";
import { FaImage, FaTimesCircle } from "react-icons/fa";
import { ThreadCard } from "../features/home/component/thread-card";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../redux/store";
import { useHomePage } from "../hooks/use-home-page";

export function CardBeranda() {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { threads, BoxCSS, ButtonPost, onSubmit, register } = useHomePage();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = (
      e.currentTarget.elements.namedItem("content") as HTMLInputElement
    ).value;

    const dataTransfer = new DataTransfer();
    if (selectedImage) {
      dataTransfer.items.add(selectedImage);
    }

    const createThreadDTO = {
      content: content,
      image: dataTransfer.files,
    };

    onSubmit(createThreadDTO);
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
                  position={"relative"}
                  bottom={"1"}
                  size="md"
                  name={currentUser.fullName}
                  src={currentUser.photoProfile}
                />
              </WrapItem>
              <form onSubmit={handleSubmit}>
                <Input
                  {...register("content")}
                  name="content"
                  w="350px"
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
                  type="file"
                  w="380px"
                  border="none"
                  color="white"
                  onChange={handleImageChange}
                />

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
          {imagePreview && (
            <Box position="relative" mt={2}>
              <Image
                width="100%"
                src={imagePreview}
                alt="Image Preview"
                borderRadius="md"
              />
              <Icon
                as={FaTimesCircle}
                color="#04A51E"
                _hover={{
                  color: "#018f18",
                }}
                position="absolute"
                top="5px"
                right="5px"
                boxSize={6}
                cursor="pointer"
                onClick={handleRemoveImage}
              />
            </Box>
          )}
        </Box>
        {threads?.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </Box>
    </Box>
  );
}

// punya frontend-test
// import {
//   Avatar,
//   Box,
//   Button,
//   Flex,
//   Heading,
//   HStack,
//   Icon,
//   Input,
//   WrapItem,
// } from "@chakra-ui/react";
// import { FaImage } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { ThreadCard } from "../features/home/component/thread-card";
// import { useHomePage } from "../hooks/use-home-page";
// import { RootState } from "../redux/store";

// export function CardBeranda() {
//   const currentUser = useSelector((state: RootState) => state.auth.user);

//   const { threads, BoxCSS, ButtonPost, onSubmit, register, handleSubmit } =
//     useHomePage();

//   const scrollbar = {
//     "overflow-x": "hidden",
//     "::-webkit-scrollbar": {
//       width: "10px",
//     },
//     "::-webkit-scrollbar-track": {
//       border: "7px solid black",
//     },
//     "::-webkit-scrollbar-thumb": {
//       background: "linear-gradient(transparent,green)",
//       borderRadius: "6px",
//     },
//   };

//   return (
//     <>
//       <Box
//         overflow="scroll"
//         sx={scrollbar}
//         w="600px"
//         m="0"
//         bg="black"
//         h="703px"
//         border="1px solid rgb(47, 51, 54)"
//         borderTop="none"
//         borderBottom="none"
//         paddingTop="10px"
//       >
//         <Box sx={BoxCSS}>
//           <Heading bg="black" color="white">
//             Home
//           </Heading>
//           <Box sx={BoxCSS}>
//             <Flex bg="black" mt="0">
//               <HStack>
//                 <WrapItem>
//                   <Avatar
//                     size="md"
//                     name="Ryan Florence"
//                     src={currentUser.photoProfile}
//                   />{" "}
//                 </WrapItem>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <Input
//                     {...register("content")}
//                     w="360px"
//                     placeholder="What is Happening?"
//                     border="none"
//                     color="white"
//                     _active={{
//                       border: "none",
//                     }}
//                   />

//                   <label htmlFor="fileupload">
//                     <Icon
//                       cursor={"pointer"}
//                       position={"relative"}
//                       top={2.5}
//                       paddingLeft={"5px"}
//                       color="brand.900"
//                       fontSize={35}
//                       ml={"5px"}
//                       _hover={{
//                         color: "white",
//                       }}
//                       as={FaImage}
//                     />
//                   </label>

//                   <Input
//                     hidden
//                     id="fileupload"
//                     {...register("image")}
//                     type="file"
//                     w="380px"
//                     border="none"
//                     color="white"
//                   ></Input>
//                   <Button
//                     position={"relative"}
//                     bottom={"1"}
//                     ml="8px"
//                     type="submit"
//                     sx={ButtonPost}
//                   >
//                     Post
//                   </Button>
//                 </form>
//               </HStack>
//             </Flex>
//           </Box>
//           {threads?.map((thread) => (
//             <ThreadCard thread={thread} />
//           ))}
//         </Box>
//       </Box>
//     </>
//   );
// }
