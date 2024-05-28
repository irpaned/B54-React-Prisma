import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs"; 
import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Heading, Box, Text, Image, IconButton, Button, WrapItem, Input, Container, Spacer, HStack, Icon, border } from '@chakra-ui/react'
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
import { FaImage } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

export function CardBeranda() {

  const ButtonPost = {
    bg: "green",
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
              <Icon color="green" fontSize={25} as={FaImage}></Icon>
              <Button sx={ButtonPost}>Post</Button>
            </HStack>
          </Flex>
        </Box>   

        <Box sx={BoxCSS}>
        <Card maxW='100%' bg="black" color="white">
        <CardHeader  padding="0 0 0 0">

          <Flex letterSpacing={1}>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

              <Box>
                <Heading size='sm'>Segun Adebayo</Heading>
                <Text color="grey">@segun</Text>
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
        <CardBody>
          <Text>
            With Chakra UI, I wanted to sync the speed of development with the speed
            of design. I wanted the developer to be just as excited as the designer to
            create a screen.
          </Text>
        </CardBody>
        <Image
          objectFit='cover'
          src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
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

