import { Avatar, Box, Button, Card, CardBody, CardHeader, FormControl, HStack, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Text, border, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { UserSearch } from '../features/search/types/search'
import { api } from '../libraries/api'


export function RightBar() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFollowed, setIsFollowed] = useState<boolean>(true)

  // coba redux
  const currentUser = useSelector((state : RootState) => state.auth.user);
    console.log(currentUser);

  // BATAS TES
  
                                                           //  👇data awalnya kosong dan dibikin array
    const [searchData, setSearchData] = useState<UserSearch[]>([]);
  
    // async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    //   setSearchInput(e.target.value);
    // }
  
    async function getData() {
                        // 👇 ini get data user (get dan use data step  1)
      const response = await api.get("/users");
      const shuffledData = response.data.sort(() => 0.5 - Math.random());
      const limitedData = shuffledData.slice(0, 4);
    //   setelah di get datanya di masukkan ke searchData (get dan use data step  2)
      setSearchData(limitedData);
      // setSearchData(response.data);
    }
  
    useEffect(() => {
      getData();
    }, []);
  // BATAS TES


    const scrollbar = {
      "overflow-x" : "hidden",
      "::-webkit-scrollbar" : {
        width : "10px"
      },
      "::-webkit-scrollbar-track" : {
        border : "7px solid black"
      },
      "::-webkit-scrollbar-thumb" : {
        background : "linear-gradient(transparent,green)",
        borderRadius : "6px"
      }
    }

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
<Box bg="black" w='400px' h="100%" color="white" p="20px 15px 0 20px" m={0}>
  <Card bg="black" color="white" border="1px solid rgb(47, 51, 54)" borderRadius="20px">
   
    <CardHeader>
      <Heading size='md'>My Profile</Heading>
    </CardHeader>

    <CardBody paddingTop="0">
      <Box w="100%" h="80px" borderRadius="10px" overflow="hidden">
        <Image  w="100%" h="100%" src='https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='Dan Abramov' />
      </Box>

      <Box width="100&" h="65px" display="flex">
      <Avatar boxSize='4em' bg={"grey"} src={currentUser.photoProfile} position="relative" left="20px" bottom="35px" border="4px solid black" />
      <Spacer></Spacer>
      <Button color="white" onClick={onOpen} aria-label='Options' variant='outline' size='sm' borderRadius="20px" mt="10px" bg={'brand.900'} border={'none'}  
              _hover={{
                      color: "brand.800",
                      bg : '#039B1C'
              }}
              _active={{
                      bg : '#05831A'
              }}>
              Edit Profile
              </Button>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent color={'white'} bg={'black'} boxShadow={"0 0 7px 1px rgba(255, 255, 255, 0.5)"} borderRadius = '20px'>
                  <ModalHeader>Edit profile</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Card bg="black" color="white"  borderRadius="20px">
                      <CardBody padding="0 0 0 0">
                        <Box w="100%" h="120px" borderRadius="10px" overflow="hidden">
                          <Image  w="100%" h="100%" src='https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='Dan Abramov' />
                        </Box>

                        <Box width="100&" h="65px" display="flex">
                        <Avatar boxSize='4em' bg={"grey"} src={currentUser.photoProfile} position="relative" left="20px" bottom="35px" border="4px solid black" />
                        </Box>
                      </CardBody>
                    </Card>
                  
                    <FormControl>
                      <Input border="1px solid #8E8E8E" placeholder='Name'/>
                    </FormControl>
                    <FormControl mt={4}>
                      <Input border="1px solid #8E8E8E" placeholder='Username'/>
                    </FormControl>
                    <FormControl mt={4}>
                      <Input border="1px solid #8E8E8E" placeholder='Bio'/>
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button bg={'brand.900'} mr={3} onClick={onClose} color={'white'}  _hover={{
                      color: "brand.800",
                      bg : '#039B1C'
              }}
              _active={{
                      bg : '#05831A'
              }}>
                      Save
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
      </Box>
      
      <Box marginTop="-5">
            <Heading fontSize='25px'>
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
    </CardBody>
  </Card>

<Card overflow={"scroll"} height={"300px"} bg="black" color="white" border="1px solid rgb(47, 51, 54)" borderRadius="20px" mt="15px" sx={scrollbar}>
  <CardHeader>
      <Heading size='md'>Suggested for you</Heading>
  </CardHeader>
{searchData.map((irfan) => (
  
    <CardBody paddingTop="0" paddingBottom="2">
    <Box display="flex">
      <HStack>
        <Avatar boxSize='2.5em' src={irfan.photoProfile} name={irfan.fullName} />
        <Box>
          <Heading size='xs'>
          {irfan.fullName}
          </Heading>
          <Text fontSize='sm' color="grey">
            @{irfan.userName}
          </Text>
        </Box>
      </HStack>
      <Spacer />
      {isFollowed ? (<Button onClick={() => { setIsFollowed(false) } }
        sx={buttonFollow}>
        Follow
      </Button>)
        : <Button onClick={() => { setIsFollowed(true) } } sx={buttonFollowed}>
          Followed
        </Button>}
    </Box>
  </CardBody>
))}
  

  
</Card>




</Box>
   
  )
}

