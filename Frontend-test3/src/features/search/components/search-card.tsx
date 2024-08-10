// import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import {
  Box,
  Button,
  Text,
  HStack,
  Flex,
  Avatar,
  BoxProps,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { UserSearch } from "../../../features/search/types/search";
import { useDebounce } from "use-debounce";
import { api } from "../../../libraries/api";
import { useFollow } from "../../../hooks/use-follow-user";
import { FollowEntity } from "../../../features/home/entities/follow-entity";

interface FollowUserProps extends BoxProps {
  follow: FollowEntity;
}

export function searchCard({ follow }: FollowUserProps) {
  const [isValue, setisValue] = useState("");
  const [searchData, setSearchData] = useState<UserSearch[]>([]);
  const { handleFollow } = useFollow(follow.id);

  const handleBlur = async () => {
    const response = await api.get(`/users?search=${isValue}`);
    setSearchData(response.data);
  };

  useEffect(() => {
    handleBlur();
  }, []);
  return (
    <>
      <Flex mb="15px" gap={3}>
        <HStack>
          <Avatar
            width={"50px"}
            height={"50px"}
            // baru kita pakai di sini dan lainnya (get dan use data step  4)
            name={follow?.user?.fullName}
            src={follow.user.photoProfile}
          />
          <Box w="420px">
            <Text fontWeight={"bold"}>{follow?.user?.fullName}</Text>
            <Text mt={"0px"} color={"gray"}>
              @{follow?.user?.userName}
            </Text>
            <Text mt={"0px"}>{follow.user.bio}</Text>
          </Box>

          <Button
            onClick={handleFollow}
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
    </>
  );
}
