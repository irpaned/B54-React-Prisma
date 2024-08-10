import { Box, Card, CardHeader, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserSearch } from "../features/search/types/search";
import { api } from "../libraries/api";
import { useSuggest } from "../hooks/use-suggest";
import { SuggestCard } from "../features/suggest/component/suggest-card";

export function RightBarProfile() {
  const { suggests } = useSuggest();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  console.log(currentUser);
  const [searchData, setSearchData] = useState<UserSearch[]>([]);

  async function getData() {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const shuffledData = response.data.sort(() => 0.5 - Math.random());
    const limitedData = shuffledData.slice(0, 4);
    setSearchData(limitedData);
    console.log("cek", limitedData);
  }

  useEffect(() => {
    getData();
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
    <Box bg="black" w="400px" h="100%" color="white" p="20px 15px 0 20px" m={0}>
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
          <SuggestCard
            key={suggest.id}
            {...suggest}
            isFollowing={suggest.isFollowed}
          />
        ))}
      </Card>
    </Box>
  );
}
