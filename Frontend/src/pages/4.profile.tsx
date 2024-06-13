import { Avatar, Box, Button, Flex, Heading, HStack, Icon, Image, Link, Spacer, Text } from '@chakra-ui/react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { ThreadCard } from '../features/home/component/thread-card';
import { useProfilePage } from '../hooks/use-profile-page.tsx';
import { RootState } from '../redux/store';

export function MyProfile() {

  const {
    threads
    } = useProfilePage()

  const currentUser = useSelector((state : RootState) => state.auth.user);
  console.log(currentUser);

  const BoxCSS = {
    border: "1px solid rgb(47, 51, 54)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    p: "20px 15px 20px 15px"
  }

  const BoxCSSTop = {
    border: "1px solid rgb(47, 51, 54)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    // borderBottom : "none",
    p: "0px 15px 20px 15px"
  }


  return (

    
    <Box w="600px" m='0' bg="black" h="700px"   border="1px solid rgb(47, 51, 54)"  borderTop="none" paddingTop="0px"  color="white" overflow="scroll">

      
        <Box sx={BoxCSS} >
          {/* TOP */}
          <Box sx={BoxCSSTop}>
          <Flex h="60px">
            <HStack>
            <Link mt="0" href="http://localhost:5173/home" fontSize="45px"><Icon mt="5" as={IoIosArrowRoundBack}></Icon></Link>
            <Heading fontSize="30px">{currentUser.fullName}</Heading>
            </HStack>
          </Flex>

        <Box mt="10px">    
          <Box w="100%" h="120px" borderRadius="10px" overflow="hidden">
            <Image  w="100%" h="100%" src='https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='Dan Abramov' />
          </Box>

          <Box  width="100&" h="65px" display="flex">
          <Avatar boxSize='4em' src={currentUser.photoProfile} position="relative" left="20px" bottom="35px" border="4px solid black" />
          <Spacer></Spacer>
          <Button color="white" variant='outline' size='sm' borderRadius="20px" mt="10px">
            Edit Profile
          </Button>
          </Box>
          
            <Box marginTop="-5">
                  <Heading fontSize="25px">
                  {currentUser.fullName}
                  </Heading>
                  <Text fontSize='md' color="grey">
                    @{currentUser.userName}
                  </Text>
                  <Text>
                  {currentUser.bio}
                  </Text>
                  <Box display="flex">
                    <Text marginRight="4px">152</Text>
                    <Text marginRight="10px" color="grey">Following</Text>
                    <Text marginRight="4px">964</Text>
                    <Text color="grey">Followers</Text>
                  </Box>
              </Box>
          </Box>
          {/*top*/} 
             
      </Box> 
      <Box >
        {threads?.map((thread) => <ThreadCard thread={thread} />)}
      </Box> 
    </Box>
    </Box>
    
  )
}

