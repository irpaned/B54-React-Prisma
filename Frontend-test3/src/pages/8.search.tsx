import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Text, HStack, Flex, Avatar } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { UserSearch } from "../features/search/types/search";
import { useDebounce } from "use-debounce";
import { api } from "../libraries/api";
import { useFollow } from "../hooks/use-follow-user";
import ButtonFollow from "../components/ui/button-follow";
import { useSuggest } from "../hooks/use-suggest";
import { SuggestCard } from "../features/suggest/component/suggest-card";

export function SearchPage({ id }: { id: number }) {
  const { isPending, onFollow } = useFollow(id);
  const { suggests } = useSuggest();
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearchInput] = useDebounce(searchInput, 100);
  const [searchData, setSearchData] = useState<UserSearch[]>([]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  async function getData() {
    const response = await api.get(`/users?search=${debouncedSearchInput}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    setSearchData(response.data);
  }

  console.log("data :", searchData);

  useEffect(() => {
    getData();
  }, [debouncedSearchInput]);

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
          onChange={handleChange}
          borderRadius="20px"
          border="none"
          type="tel"
          placeholder="Search your friend"
          color="#B2B2B2"
          bg="#3F3F3F"
        />
      </InputGroup>

      {searchData.map((user) => (
        <Flex mb="15px" gap={3}>
          <HStack>
            <Avatar
              width={"50px"}
              height={"50px"}
              name={user.fullName}
              src={user.photoProfile}
            />
            <Box w="420px">
              <Text fontWeight={"bold"}>{user.fullName}</Text>
              <Text mt={"0px"} color={"gray"}>
                @{user.userName} {user.id}
              </Text>
              <Text mt={"0px"}>{user.bio}</Text>
            </Box>

            <ButtonFollow
              isFollowing={user.isFollowed}
              isLoading={isPending}
              onClick={onFollow}
            />
          </HStack>
        </Flex>
      ))}

      {/* {searchData.map((suggest) => (
        <SuggestCard
          key={suggest.id}
          {...suggest}
          isFollowing={suggest.isFollowed}
        />
      ))} */}
    </Box>
  );
}
