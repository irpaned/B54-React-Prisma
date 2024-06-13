import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Button, Text, HStack, Flex, Avatar } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiUserSearchLine } from "react-icons/ri";
import { UserSearch } from '../features/search/types/search';
import { useDebounce } from "use-debounce";
import { api } from '../libraries/api';



export function SearchPage() {

    const [searchInput, setSearchInput] = useState<string>("");
    const [debouncedSearchInput] = useDebounce(searchInput, 400); // selama 0.4 detik akan ngehit ke backend
                                                           //  👇data awalnya kosong dan dibikin array
    const [searchData, setSearchData] = useState<UserSearch[]>([]);
  
    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setSearchInput(e.target.value);
    }
  
    async function getData() {
                        // 👇 ini get data user (get dan use data step  1)
      const response = await api.get(`/users?search=${debouncedSearchInput}`);
    //   setelah di get datanya di masukkan ke searchData (get dan use data step  2)
      setSearchData(response.data);
    }
  
    useEffect(() => {
      getData();
    }, [debouncedSearchInput]);

  return (
    <Box w="600px" m='0' bg="black" h="700px"   border="1px solid rgb(47, 51, 54)" borderTop="none" padding="40px 10px 0px 10px" color="white" overflow="scroll">
        {/* <Input   placeholder="Search your friend" size='md' />    */}
        <InputGroup mb="20px" >
            <InputLeftElement pointerEvents='none'>
                <RiUserSearchLine size="23px" color='#B2B2B2' />
            </InputLeftElement>
            <Input onChange={handleChange} borderRadius="20px" border="none" type='tel' placeholder='Search your friend' color="#B2B2B2" bg="#3F3F3F" />
        </InputGroup>
        {/* kita mapping datanya (get dan use data step  3) */}
        {searchData.map((irfan) => (
          <Flex mb="15px"  gap={3}>
            <HStack>
            <Avatar 
              width={"50px"}
              height={"50px"} 
            // baru kita pakai di sini dan lainnya (get dan use data step  4)
              name={irfan.fullName} 
              src={irfan.photoProfile} />
            <Box w="436px">
              <Text fontWeight={"bold"}>{irfan.fullName}</Text>
              <Text mt={"0px"} color={"gray"}>
                @{irfan.userName}
              </Text>
              <Text mt={"0px"}>{irfan.bio}</Text>
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
              <Text fontSize="14px" mt="0">Follow</Text>
            </Button>
            </HStack>
          </Flex>
        ))}
    </Box>
  )

 
}
