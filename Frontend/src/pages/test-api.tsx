import { Box, Button, ChakraProvider, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { api } from '../libraries/api'
import { useMutation, useQueryClient } from '@tanstack/react-query';




export function Test() {

  type Post = {
    userId: number,
    id: number,
    title: string,
    body: string
    
  }

  const [posts, setPost] = useState<Post[]>([]);

  async function getPost () {
    const response = await api.get("/users");
    // const response = await api.get("/test");
    setPost(response.data)
    console.log(response.data);
  }

  useEffect (() => {
    getPost();
  }, [])


  return (
    <>
      <Box color="white" bg="black">
        {/* {JSON.stringify(posts)} */}
        <Heading>About Page</Heading>
        {posts.map(value => {
          return (
            <>
               <Text border="2px solid white" m="2">{value.id}</Text>
            </>
          )
        })}
      </Box>
    </>
  
  )
}



