import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Button, Text, HStack, Flex, Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { UserSearch } from "../features/search/types/search";
import { api } from "../libraries/api";

export function SearchPageTest() {
  const [isValue, setisValue] = useState("");
  const [searchData, setSearchData] = useState<UserSearch[]>([]);

  const handleBlur = async () => {
    const response = await api.get(`/users?search=${isValue}`);
    setSearchData(response.data);
  };

  useEffect(() => {
    handleBlur();
  }, []);

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
      w="600px"
      m="0"
      bg="black"
      h="728px"
      border="1px solid rgb(47, 51, 54)"
      borderTop="none"
      padding="40px 10px 0px 10px"
      color="white"
      overflow="scroll"
      sx={scrollbar}
    >
      {/* <Input   placeholder="Search your friend" size='md' />    */}
      <InputGroup mb="20px">
        <InputLeftElement pointerEvents="none">
          <RiUserSearchLine size="23px" color="#B2B2B2" />
        </InputLeftElement>
        <Input
          type="text"
          value={isValue}
          onChange={(e) => setisValue(e.target.value)}
          onBlur={handleBlur}
          borderRadius="20px"
          border="none"
          placeholder="Search your friend"
          color="#B2B2B2"
          bg="#3F3F3F"
        />
        {/* <Button onClick={handleChange}></Button> */}
      </InputGroup>
      {/* kita mapping datanya (get dan use data step  3) */}
      {searchData.map((user) => (
        <Flex mb="15px" gap={3}>
          <HStack>
            <Avatar
              width={"50px"}
              height={"50px"}
              // baru kita pakai di sini dan lainnya (get dan use data step  4)
              name={user.fullName}
              src={user.photoProfile}
            />
            <Box w="420px">
              <Text fontWeight={"bold"}>{user.fullName}</Text>
              <Text mt={"0px"} color={"gray"}>
                @{user.userName}
              </Text>
              <Text mt={"0px"}>{user.bio}</Text>
            </Box>

            <Button
              justifyContent="end"
              backgroundColor={"transparent"}
              border={"2px solid white"}
              color={"white"}
              p="0px 15px 1px 15px"
              borderRadius="50px"
              h="35px"
            >
              <Text fontSize="14px" mt="0">
                Follow
              </Text>
            </Button>
          </HStack>
        </Flex>
      ))}
    </Box>
  );
}
