import { Avatar, Box, BoxProps, Button, Card, CardBody, CardFooter, CardHeader, Flex, HStack, Heading, Icon, IconButton, Image, Input, Text, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { BiChat, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaImage, FaRegHeart } from "react-icons/fa";
import { ThreadEntity } from "../entities/thread";




interface ThreadCardProps extends BoxProps {
    thread: ThreadEntity; 
    
  }

export function ThreadCard({ thread }: ThreadCardProps) {



    const BoxCSS = {
        border: "1px solid rgb(47, 51, 54)",
        borderTop: "none",
        borderRight: "none",
        borderLeft: "none",
        p: "20px 15px 20px 15px"
      }

    return (

    <>
  
        
        <Box sx={BoxCSS}>
                <Card maxW='100%' bg="black" color="white">
                    <CardHeader padding="0 0 0 0">
                    
                        <Flex letterSpacing={0}>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name='Muhammad Irfan' src="" />

                                <Flex gap={2}>
                                    {/* <Heading size='sm'>{thread?.user?.fullName}</Heading> */}
                                    <Heading fontSize="17px">
                                        Muhammad Irfan
                                        </Heading>
                                    {/* <Text color="grey">@{thread?.user?.username}</Text> */}
                                    <Text color="grey">@irpaned</Text>
                                    {/* <Text>{thread?.createdAt.toLocaleString()}</Text> */}
                                    <Text>4h</Text>
                                </Flex>
                            </Flex>
                        

                            <IconButton
                                variant='ghost'
                                color="grey"
                                aria-label='See menu'
                                icon={<BsThreeDotsVertical />} />
                        </Flex>
                    </CardHeader>
                    <CardBody p="8px 0 8px 5px">
                        <Text>
                            {/* The most beautiful view i have ever seen in my life😍 */}
                            {thread.content}
                        </Text>
                    </CardBody>
                    <Image borderRadius="20px"
                        objectFit='cover'
                        src={thread.image}/>

                    <CardFooter
                        justify='space-between'
                        flexWrap='wrap'
                        sx={{
                            '& > button': {
                                minW: '136px',
                            },
                        }}
                        paddingBottom="0px"
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
            </Box></>
    )

    

}