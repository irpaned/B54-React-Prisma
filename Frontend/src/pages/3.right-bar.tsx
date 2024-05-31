import { Card, CardHeader, CardBody, CardFooter, Text, Heading, Stack, StackDivider, Box, Image, Avatar, AvatarBadge, Button, HStack, Spacer, border } from '@chakra-ui/react'
import { color } from 'framer-motion'
import React, { useState } from 'react'
import { BiGame } from 'react-icons/bi'

export function RightBar() {

  const [isFollowed, setIsFollowed] = useState<boolean>(true)

  const buttonFollow = {
    
    color: "brand.800",
    bg: "brand.700",
    borderRadius: "20px",
    fontSize: 'sm',
    p: "0px 20px 0px 20px",
    border: "1px solid white",
    ":hover" : {
        bg : "brand.800",
        color: "brand.700",
    },
    
  }

  const buttonFollowed = {
    
    color: "brand.800",
    bg: "brand.700",
    borderRadius: "20px",
    fontSize: 'sm',
    p: "0px 12px 0px 12px",
    border: "1px solid white",
    ":hover" : {
        bg : "brand.800",
        color: "brand.700",
    },
    
  }

  return (
<Box bg="black" w='400px' h="3000" color="white" p="20px 15px 0 20px" m={0}>
  <Card bg="black" color="white" border="1px solid rgb(47, 51, 54)" borderRadius="20px">
   
    <CardHeader>
      <Heading size='md'>My Profile</Heading>
    </CardHeader>

    <CardBody paddingTop="0">
      <Box w="100%" h="80px" borderRadius="10px" overflow="hidden">
        <Image  w="100%" h="100%" src='https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='Dan Abramov' />
      </Box>

      <Box width="100&" h="65px" display="flex">
      <Avatar boxSize='4em' src='https://bit.ly/dan-abramov' position="relative" left="20px" bottom="35px" border="4px solid black" />
      <Spacer></Spacer>
      <Button color="white" variant='outline' size='sm' borderRadius="20px" mt="10px">
        Edit Profile
      </Button>
      </Box>
      
      <Box marginTop="-5">
            <Heading size='lg'>
              Kevin bin Joko
            </Heading>
            <Text fontSize='md' color="grey">
              @kevin
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
    </CardBody>
  </Card>

<Card bg="black" color="white" border="1px solid rgb(47, 51, 54)" borderRadius="20px" mt="15px">
  <CardHeader>
      <Heading size='md'>Suggested for you</Heading>
  </CardHeader>

  <CardBody paddingBottom="0">
    <Box display="flex">
      <HStack>
      <Avatar boxSize='2.5em' src='https://bit.ly/dan-abramov' />
      <Box>
      <Heading size='xs'>
        Kevin bin Joko
      </Heading>
      <Text fontSize='sm' color="grey">
        @kevin
      </Text>
      </Box>
      </HStack>
      <Spacer/>
      {isFollowed ? (<Button onClick={() => {setIsFollowed(false)}} 
       sx={buttonFollow}>
        Follow
      </Button>) 
      : <Button onClick={() => {setIsFollowed(true)}} sx={buttonFollowed}>
      Followed
    </Button> }
     
    </Box>
  </CardBody>

  <CardBody>
    <Box display="flex">
      <HStack>
      <Avatar boxSize='2.5em' src='https://bit.ly/dan-abramov' />
      <Box>
      <Heading size='xs'>
        Kevin bin Joko
      </Heading>
      <Text fontSize='sm' color="grey">
        @kevin
      </Text>
      </Box>
      </HStack>
      <Spacer/>
      <Button sx={buttonFollow}>
        Follow
      </Button >  
    </Box>
  </CardBody>

  
</Card>




</Box>
   
  )
}

