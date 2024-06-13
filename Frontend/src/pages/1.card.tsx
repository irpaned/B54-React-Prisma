import { Avatar, Box, Button, Flex, Heading, HStack, Icon, Input, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { FaImage } from 'react-icons/fa';
import { ThreadCard } from '../features/home/component/thread-card';
import { useHomePage } from '../hooks/use-home-page';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export function CardBeranda() { 

  const currentUser = useSelector((state : RootState) => state.auth.user);
  

  const {
    threads,
    BoxCSS,
    ButtonPost,
    onSubmit,
    register,
    handleSubmit} = useHomePage()

  return (
    <>
    <Box overflow="scroll"
     w="600px" m='0' bg="black" h="703px" 
       border="1px solid rgb(47, 51, 54)" 
       borderTop="none" borderBottom="none" 
       paddingTop="10px"
       >

      <Box sx={BoxCSS}  > 
          <Heading bg="black" color="white" >
            Home
          </Heading>
          <Box sx={BoxCSS}>
    <Flex bg="black" mt="5">
        <HStack>
            <WrapItem>
                <Avatar size='md' name='Ryan Florence' src={currentUser.photoProfile} />{' '}
            </WrapItem>
            {/* (TanStack query untuk post data step 3) */}
            <form onSubmit={handleSubmit(onSubmit)}>
            
            <Input 
            // (TanStack query  untuk post data step 2)
            {...register("content")}
            w="380px" placeholder='What is Happening?' border="none" color="white" />
      
            <Icon color="brand.900" fontSize={25} as={FaImage}></Icon>

            <Input 
            // (TanStack query  untuk post data step 2)
            {...register("image")}
            type="file" w="380px" border="none" color="white"></Input>
            <Button ml="5px" type='submit' sx={ButtonPost}>Post</Button>
            </form>
        </HStack>
    </Flex>
    </Box>
          {threads?.map((thread) => <ThreadCard thread={thread} />)}
     </Box>     
    </Box>
</>
)
}











