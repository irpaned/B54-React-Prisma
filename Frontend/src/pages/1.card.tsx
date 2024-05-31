import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, HStack, Heading, Icon, IconButton, Image, Input, Text, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { BiChat, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaImage, FaRegHeart } from "react-icons/fa";

export function CardBeranda() {

  

  const ButtonPost = {
    bg: "brand.900",
    color: "white",
    borderRadius: 30,
    p: "0px 20px 1px 20px",
    ":hover" : {
      bg: "white",
      color : "black"
    }
  }

  const BoxCSS = {
    border: "1px solid rgb(47, 51, 54)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    p: "20px 15px 20px 15px"
  }

  return (
    <>
    <Box w="600px" m='0' bg="black" h="1000"   border="1px solid rgb(47, 51, 54)" borderTop="none" paddingTop="10px">

      <Box sx={BoxCSS} >
          <Heading bg="black" color="white" >
            Home
          </Heading>

          <Flex bg="black" mt="10" >
            <HStack>
            <WrapItem>
                <Avatar size='md' name='Ryan Florence' src='https://bit.ly/ryan-florence' />{' '}
              </WrapItem>
              <Input  w="400px" placeholder='What is Happening?' border="none" color="white" />
              <Icon color="brand.900" fontSize={25} as={FaImage}></Icon>
              <Button sx={ButtonPost}>Post</Button>
            </HStack>
          </Flex>
        </Box>   

        <Box sx={BoxCSS}>
        <Card maxW='100%' bg="black" color="white">
        <CardHeader  padding="0 0 0 0">

          <Flex letterSpacing={1}>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name='Segun Adebayo' src='https://images.pexels.com/photos/832908/pexels-photo-832908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />

              <Box>
                <Heading size='sm'>Muhammad Irfan</Heading>
                <Text color="grey">@irfan</Text>
              </Box>
          </Flex>

            <IconButton
              variant='ghost'
              color= "grey"
              aria-label='See menu'
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>
        <CardBody p="8px 0 8px 5px">
          <Text>
            The most beautiful view i have ever seen in my life😍
          </Text>
        </CardBody>
        <Image borderRadius="20px"
          objectFit='cover'
          src='https://images.pexels.com/photos/2668314/pexels-photo-2668314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt='Chakra UI'
        />

        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Button flex='1' variant='white' leftIcon={<FaRegHeart />}>
            Like
          </Button>
          <Button flex='1' variant='white' leftIcon={<BiChat />}>
            Comment
          </Button>
          <Button flex='1' variant='white' leftIcon={<BiShare />}>
            Share
          </Button>
        </CardFooter>
      </Card>
        </Box>
          
    </Box>
   
    
</>
)
}

// state management
// const state = useContext(TransactionContext);

//   console.log("transaction", state?.transactions)

//   useEffect(() => {
//     state?.AddNewTransaction({
//       id: 123,
//       name: "Irfan",
//       price: 123,
//       qty: 123
//     });
//   }, []);


//   {JSON.stringify(state?.transactions)}