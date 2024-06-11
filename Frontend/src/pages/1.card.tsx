import { Avatar, Box, Button, Flex, Heading, HStack, Icon, Input, WrapItem } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { ThreadCard } from '../features/home/component/thread-card';
import { api } from "../libraries/api";
import { ThreadEntity } from '../features/home/entities/thread';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateThreadDTO } from '../features/home/types/thread';
import { zodResolver } from '@hookform/resolvers/zod';
import { createThreadSchema } from '../features/home/validators/thread-schema';
import { AxiosError } from 'axios';
import { FaImage } from 'react-icons/fa';

export function CardBeranda() { 

// 👇 Menggunakan TanStack query
    const { data : threads, refetch } = useQuery<ThreadEntity[]>({
    queryKey : ["threads"], 
    queryFn : getThreads})

  async function getThreads() {
    const response = await api.get("/threads", {
      headers : {
        Authorization : `Bearer ${localStorage.token}`
      }
    })
    return response.data
  }

  // Menggunakan react hook form
  const { register, handleSubmit } 
  = useForm<CreateThreadDTO>({
    mode : 'onSubmit',
    resolver: zodResolver(createThreadSchema)
})



// 👇 Menggunakan TanStack query
// karena kita ingin menggunakan post maka pakai useMutation
const { mutateAsync } = useMutation<
ThreadEntity, 
AxiosError, 
CreateThreadDTO>({
  mutationFn: (newThread) => {
      const formData = new FormData();
      formData.append("content", newThread.content);
      formData.append("image", newThread.image[0]);
      console.log(newThread);
      return api.post("/threads", formData, {
          headers : {
              Authorization : `Bearer ${localStorage.token}`
          }
      })
  }
})
//   setelah setting di atas ini jangan lupa register pada input

const onSubmit: SubmitHandler<CreateThreadDTO> = async (data) => {
 try {
  await mutateAsync(data)
  refetch()
 } catch (error) {
  console.log(error);
 }
}

const BoxCSS = {
  border: "1px solid rgb(47, 51, 54)",
  borderTop: "none",
  borderRight: "none",
  borderLeft: "none",
  p: "20px 15px 20px 15px"
}

const ButtonPost = {
  bg: "brand.900",
  color: "white",
  borderRadius: 30,
  p: "0px 20px 1px 20px",
  ":hover" : {
    bg: "white",
    color : "black"
  }
 

  // const BoxCSS = {
  //   // border: "1px solid rgb(47, 51, 54)",
  //   // borderTop: "none",
  //   // borderRight: "none",
  //   // borderLeft: "none",
  //   p: "20px 15px 20px 15px"
  // }

}

  return (
    <>
    <Box w="600px" m='0' bg="black" h="100%"   border="1px solid rgb(47, 51, 54)" borderTop="none" paddingTop="10px">

      <Box sx={BoxCSS}  >
          <Heading bg="black" color="white" >
            Home
          </Heading>
          <Box sx={BoxCSS}>
    <Flex bg="black" mt="5">
        <HStack>
            <WrapItem>
                <Avatar size='md' name='Ryan Florence' src='https://images.pexels.com/photos/832908/pexels-photo-832908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />{' '}
            </WrapItem>
            <form onSubmit={handleSubmit(onSubmit)}>
            
            <Input 
            {...register("content")}
            w="380px" placeholder='What is Happening?' border="none" color="white" />
      
            <Icon color="brand.900" fontSize={25} as={FaImage}></Icon>

            <Input 
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
