import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Card } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { useDebounce } from "use-debounce";
import { UserSearch } from "../features/search/types/search";
import { SuggestCard } from "../features/suggest/component/suggest-card";
import { api } from "../libraries/api";

export function SearchPage() {
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

      {searchData &&
        searchData.map((search) => {
          return (
            <Card key={search.id} bg="black">
              <SuggestCard
                fullName={search.fullName}
                id={search.id}
                photoProfile={search.photoProfile}
                userName={search.userName}
                isFollowing={search.isFollowed}
              />
            </Card>
          );
        })}
    </Box>
  );
}
