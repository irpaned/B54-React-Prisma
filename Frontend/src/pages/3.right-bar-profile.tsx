import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserSearch } from "../features/search/types/search";
import { api } from "../libraries/api";

export function RightBarProfile() {
  const [isFollowed, setIsFollowed] = useState<boolean[]>([]);

  // coba redux
  const currentUser = useSelector((state: RootState) => state.auth.user);
  console.log(currentUser);

  //  👇data awalnya kosong dan dibikin array
  const [searchData, setSearchData] = useState<UserSearch[]>([]);

  // async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setSearchInput(e.target.value);
  // }

  async function getData() {
    // 👇 ini get data user (get dan use data step  1)
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const shuffledData = response.data.sort(() => 0.5 - Math.random());
    const limitedData = shuffledData.slice(0, 4);
    //   setelah di get datanya di masukkan ke searchData (get dan use data step  2)
    setSearchData(limitedData);
    console.log("cek", limitedData);

    // setSearchData(response.data);
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

  const buttonFollow = {
    color: "brand.800",
    bg: "brand.700",
    borderRadius: "20px",
    fontSize: "sm",
    p: "0px 20px 0px 20px",
    border: "1px solid white",
    ":hover": {
      bg: "brand.800",
      color: "brand.700",
    },
  };

  const buttonFollowed = {
    color: "brand.800",
    bg: "brand.700",
    borderRadius: "20px",
    fontSize: "sm",
    p: "0px 12px 0px 12px",
    border: "1px solid white",
    ":hover": {
      bg: "brand.800",
      color: "brand.700",
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
        {searchData.map((user, index) => (
          <CardBody paddingTop="0" paddingBottom="2">
            <Box display="flex">
              <HStack>
                <Avatar
                  boxSize="2.5em"
                  src={user.photoProfile}
                  name={user.fullName}
                />
                <Box>
                  <Heading size="xs">{user.fullName}</Heading>
                  <Text fontSize="sm" color="grey">
                    @{user.userName}
                  </Text>
                </Box>
              </HStack>
              <Spacer />
              {isFollowed ? (
                <Button
                  onClick={() => {
                    setIsFollowed([false]);
                    console.log(isFollowed);
                  }}
                  sx={buttonFollow}
                >
                  Follow
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsFollowed([true]);
                  }}
                  sx={buttonFollowed}
                >
                  Followed
                </Button>
              )}
            </Box>
          </CardBody>
        ))}
      </Card>
    </Box>
  );
}
