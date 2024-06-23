import { Avatar, Box, BoxProps, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { BiChat, BiShare } from 'react-icons/bi';
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ThreadEntity } from "../entities/thread-entity";



interface ThreadCardProps extends BoxProps {
    thread: ThreadEntity; 
    
  }

export function ThreadCard({ thread }: ThreadCardProps) {

    const BoxCSS = {
        border: "1px solid rgb(47, 51, 54)",
        borderTop: "none",
        borderRight: "none",
        borderLeft: "none",
        p: "20px 0px 20px 0px"
      }

    return (

    <>
  
        
        <Box sx={BoxCSS}>
                <Card maxW='100%' bg="black" color="white" padding="0 0 0 0">
                    <CardHeader padding="0 0 0 0">
                    
                        <Flex letterSpacing={0.2}>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name={thread?.user?.fullName} src={thread?.user?.photoProfile} />

                                <Flex gap={2}>
                                {/*  menampilkan relasi user step 3 */}
                                    <Heading size='sm'>{thread?.user?.fullName}</Heading>
                                    <Text color="grey">@{thread?.user?.userName}</Text>
                                    <Text>{thread?.createdAt.toLocaleString()}</Text>
                                    {/* <Text>4h</Text> */}
                                </Flex>
                            </Flex>
                        
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<BsThreeDots />}
                                    variant='outline'
                                    color={"white"}
                                    border={"none"}
                                    mt={'5px'}
                                    _hover={{
                                        color: "brand.900"
                                    }}
                                    _active={{
                                        bg : "black"
                                    }}
                                    
                                />
                                <MenuList boxShadow={"0 0 7px 1px rgba(255, 255, 255, 0.5)"} border={'none'} bg={'black'} p='10px 10px 10px 10px' borderRadius={'10px'}>
                                    <MenuItem 
                                    fontWeight={"bold"}
                                    fontSize={"15px"} 
                                    bg={'black'} 
                                    w='100%'
                                    gap={2} 
                                    paddingLeft={'1.5'}
                                    _hover={{
                                        bg : "rgba(255, 255, 255, 0.2)",
                                        borderRadius : '10px'
                                        
                                    }} >
                                        <Icon as={RiDeleteBin5Line} fontSize={"18px"}/> 
                                        <Text letterSpacing={0.5}>Delete</Text> 
                                    </MenuItem>
                                    <MenuItem 
                                    fontWeight={"bold"}
                                    fontSize={"15px"} 
                                    bg={'black'} 
                                    w='100%'
                                    gap={2} 
                                    paddingLeft={'1.5'}
                                    _hover={{
                                        bg : "rgba(255, 255, 255, 0.2)",
                                        borderRadius : '10px'
                                        
                                    }} >
                                        <Icon as={MdOutlineModeEdit} fontSize={"18px"}/> 
                                        <Text letterSpacing={0.5}>Edit</Text>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>

                    </CardHeader>
                    <CardBody p="8px 0 8px 5px">
                        <Text>
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
