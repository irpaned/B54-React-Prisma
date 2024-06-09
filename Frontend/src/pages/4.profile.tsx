import { Avatar, Box, Button, Text, Image, Flex, Heading, HStack, Icon, Spacer, CardBody, CardFooter, Card, CardHeader, IconButton, Link } from '@chakra-ui/react'
import { IoIosArrowRoundBack } from "react-icons/io";
import React from 'react'
import { FaRegHeart } from 'react-icons/fa';
import { BiChat, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaCircle } from "react-icons/fa";

export function MyProfile() {

  const BoxCSS = {
    border: "1px solid rgb(47, 51, 54)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    p: "20px 15px 20px 15px"
  }


  return (
    <Box w="600px" m='0' bg="black" h="700px"   border="1px solid rgb(47, 51, 54)" borderTop="none" paddingTop="0px" color="white" overflow="scroll">

        <Box sx={BoxCSS} >
          <Flex h="60px">
            <HStack>
            <Link mt="0" href="http://localhost:5173/home" fontSize="45px"><Icon mt="5" as={IoIosArrowRoundBack}></Icon></Link>
            <Heading fontSize="30px">Muhammad Irfan</Heading>
            </HStack>
          </Flex>

      <Box mt="10px">    
          <Box w="100%" h="120px" borderRadius="10px" overflow="hidden">
            <Image  w="100%" h="100%" src='https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='Dan Abramov' />
          </Box>

          <Box width="100&" h="65px" display="flex">
          <Avatar boxSize='4em' src='https://images.pexels.com/photos/832908/pexels-photo-832908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' position="relative" left="20px" bottom="35px" border="4px solid black" />
          <Spacer></Spacer>
          <Button color="white" variant='outline' size='sm' borderRadius="20px" mt="10px">
            Edit Profile
          </Button>
          </Box>
          
          <Box marginTop="-5">
                <Heading fontSize="25px">
                  Muhammad Irfan
                </Heading>
                <Text fontSize='md' color="grey">
                  @irfan
                </Text>
                <Text>
                  I am a Fullstack Developer
                </Text>
                <Box display="flex">
                  <Text marginRight="4px">152</Text>
                  <Text marginRight="10px" color="grey">Following</Text>
                  <Text marginRight="4px">964</Text>
                  <Text color="grey">Followers</Text>
                </Box>
            </Box>
      </Box> 
    </Box>

        {/* batas */}
        <Box sx={BoxCSS}>
        <Card maxW='100%' bg="black" color="white">
        <CardHeader  padding="0 0 0 0">

          <Flex letterSpacing={1}>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name='Muhammad Irfan' src='https://images.pexels.com/photos/832908/pexels-photo-832908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />

              <Flex>
                <HStack>
                <Heading size='sm'>Muhammad Irfan</Heading>
                <Text color="grey">@irfan</Text>
                <Icon color="grey" fontSize="6px" mt="5px" as={FaCircle}/>
                <Text color="grey">4h</Text>
                </HStack>
              </Flex>
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

        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          p="0px 5px 0px 5px"
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Button flex='1' variant='white' leftIcon={<FaRegHeart />}>
            132
          </Button>
          <Button flex='1' variant='white' leftIcon={<BiChat />}>
            50
          </Button>
          <Button flex='1' variant='white' leftIcon={<BiShare />}>
            3
          </Button>
        </CardFooter>
      </Card>
        </Box>

        {/* batas */}
        <Box sx={BoxCSS}>
        <Card maxW='100%' bg="black" color="white">
        <CardHeader  padding="0 0 0 0">

          <Flex letterSpacing={1}>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name='Segun Adebayo' src='https://images.pexels.com/photos/832908/pexels-photo-832908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />

              <Flex>
                <HStack>
                <Heading size='sm'>Muhammad Irfan</Heading>
                <Text color="grey">@irfan</Text>
                <Icon color="grey" fontSize="6px" mt="5px" as={FaCircle}/>
                <Text color="grey">4h</Text>
                </HStack>
              </Flex>
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

        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          p="0px 5px 0px 5px"
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Button flex='1' variant='white' leftIcon={<FaRegHeart />}>
            132
          </Button>
          <Button flex='1' variant='white' leftIcon={<BiChat />}>
            50
          </Button>
          <Button flex='1' variant='white' leftIcon={<BiShare />}>
            3
          </Button>
        </CardFooter>
      </Card>
        </Box>
        {/* Batas */}
        <Box sx={BoxCSS}>
        <Card maxW='100%' bg="black" color="white">
        <CardHeader  padding="0 0 0 0">

          <Flex letterSpacing={1}>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name='Muhammad Irfan' src='https://images.pexels.com/photos/832908/pexels-photo-832908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />

              <Flex>
                <HStack>
                <Heading size='sm'>Muhammad Irfan</Heading>
                <Text color="grey">@irfan</Text>
                <Icon color="grey" fontSize="6px" mt="5px" as={FaCircle}/>
                <Text color="grey">4h</Text>
                </HStack>
              </Flex>
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

        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          p="0px 5px 0px 5px"
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Button flex='1' variant='white' leftIcon={<FaRegHeart />}>
            132
          </Button>
          <Button flex='1' variant='white' leftIcon={<BiChat />}>
            50
          </Button>
          <Button flex='1' variant='white' leftIcon={<BiShare />}>
            3
          </Button>
        </CardFooter>
      </Card>
        </Box>



    </Box>
  )
}

