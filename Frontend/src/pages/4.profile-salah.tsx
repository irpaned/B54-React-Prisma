// import { Avatar, Box, Button, Card, CardBody, Flex, Heading, HStack, Icon, Image, Input, Link, Spacer, Text, Textarea } from '@chakra-ui/react';
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { useSelector } from 'react-redux';
// import { ThreadCard} from '../features/home/component/thread-card.tsx';
// import { useHomePage } from '../hooks/use-home-page.tsx';
// import { RootState } from '../redux/store.ts';
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   FormControl
// } from "@chakra-ui/react";
// import { useDisclosure } from "@chakra-ui/react";
// import { useEditProfileForm } from '../features/profile/hooks/use-edit-profile.ts';

// export function MyProfile() {

//   // ganti hooks dari luar
//   const {errors, handleSubmit, onSubmit, register} = useEditProfileForm()

//   const { isOpen, onOpen, onClose } = useDisclosure();
//     const {
//     threads
//     } = useHomePage()

//   const currentUser = useSelector((state : RootState) => state.auth.user);
//   console.log(currentUser);

//   const BoxCSS = {
//     border: "1px solid rgb(47, 51, 54)",
//     borderTop: "none",
//     borderRight: "none",
//     borderLeft: "none",
//     p: "20px 15px 20px 15px"
//   }

//   const BoxCSSTop = {
//     border: "1px solid rgb(47, 51, 54)",
//     borderTop: "none",
//     borderRight: "none",
//     borderLeft: "none",
//     // borderBottom : "none",
//     p: "0px 15px 20px 15px"
//   }


//   return (

    
//     <Box w="600px" m='0' bg="black" h="700px"   border="1px solid rgb(47, 51, 54)"  borderTop="none" paddingTop="0px"  color="white" overflow="scroll">

      
//         <Box sx={BoxCSS} >
//           {/* TOP */}
//           <Box sx={BoxCSSTop}>
//           <Flex h="60px">
//             <HStack>
//             <Link mt="0" href="http://localhost:5173/home" fontSize="45px"><Icon mt="5" as={IoIosArrowRoundBack}></Icon></Link>
//             <Heading fontSize="30px">{currentUser.fullName}</Heading>
//             </HStack>
//           </Flex>

//         <Box mt="10px">    
//           <Box w="100%" h="120px" borderRadius="10px" overflow="hidden">
//             <Image  w="100%" h="100%" src='https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='Dan Abramov' />
//           </Box>

//           <Box  width="100&" h="65px" display="flex">

//               <Avatar boxSize='4em' src={currentUser.photoProfile} position="relative" left="20px" bottom="35px" border="4px solid black" />
//               <Spacer></Spacer>
              
//               <Button color="white" onClick={onOpen} aria-label='Options' variant='outline' size='sm' borderRadius="20px" mt="10px" bg={'brand.900'} border={'none'}  
//               _hover={{
//                       color: "brand.800",
//                       bg : '#039B1C'
//               }}
//               _active={{
//                       bg : '#05831A'
//               }}>
//               Edit Profile
//               </Button>
              
//               <form onSubmit={handleSubmit(onSubmit)}>
//               <Modal isOpen={isOpen} onClose={onClose}>
//                 <ModalOverlay />
//                 <ModalContent color={'white'} bg={'black'} boxShadow={"0 0 7px 1px rgba(255, 255, 255, 0.5)"} borderRadius = '20px'>
//                   <ModalHeader>Edit profile</ModalHeader>
//                   <ModalCloseButton />
//                   <ModalBody>
//                     <Card bg="black" color="white"  borderRadius="20px">
//                       <CardBody padding="0 0 0 0">
//                         <Box w="100%" h="120px" borderRadius="10px" overflow="hidden">
//                           <Image  w="100%" h="100%" src='https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='Dan Abramov' />
//                         </Box>

//                         <Box width="100&" h="65px" display="flex">
//                         <Avatar boxSize='4em' bg={"grey"} src={currentUser.photoProfile} position="relative" left="20px" bottom="35px" border="4px solid black" />
//                         </Box>
//                       </CardBody>
//                     </Card>
                  
                  
//                     <FormControl>
//                       <Input
//                       {...register("fullName")}
//                       defaultValue={currentUser.fullName}  border="1px solid #8E8E8E" placeholder='Full Name'/>
//                     </FormControl>
//                     <FormControl mt={4}>
//                       <Input
//                        {...register("userName")}
//                        defaultValue={currentUser.userName} border="1px solid #8E8E8E" placeholder='Username'/>
//                     </FormControl>
//                     <FormControl mt={4}>
//                       <Textarea
//                       {...register("bio")}
//                       defaultValue={currentUser.bio} placeholder="Bio" height="30px" resize={'none'} />
//                     </FormControl>
//                   </ModalBody>
                  
//                   <ModalFooter>
//                     <Button 
//                     isDisabled={!!(errors.bio?.message || errors.fullName?.message || errors.userName?.message)}
//                     bg={'brand.900'} 
//                     mr={3} 
//                     type='submit'
//                     // onClick={onClose} 
//                     color={'white'}  _hover={{
//                       color: "brand.800",
//                       bg : '#039B1C'
//               }}
//               _active={{
//                       bg : '#05831A'
//               }}>
//                       Save
//                     </Button>
//                   </ModalFooter>
//                 </ModalContent>
//               </Modal>
//               </form>
              
//           </Box>
         
          
//             <Box marginTop="-5">
//                   <Heading fontSize="25px">
//                   {currentUser.fullName}
//                   </Heading>
//                   <Text fontSize='md' color="grey">
//                     @{currentUser.userName}
//                   </Text>
//                   <Text>
//                   {currentUser.bio}
//                   </Text>
//                   <Box display="flex">
//                     <Text marginRight="4px">152</Text>
//                     <Text marginRight="10px" color="grey">Following</Text>
//                     <Text marginRight="4px">219 rb</Text>
//                     <Text color="grey">Followers</Text>
//                   </Box>
//               </Box>
//           </Box>
//           {/*top*/} 
             
//       </Box> 
//       <Box >

//         {/* tanStack */}
//         {/* {threads?.map((thread: ThreadEntity) => <ThreadCard thread={thread} />)} */}
//         {threads?.map((thread) => <ThreadCard thread={thread} />)}

//         {/* Redux */}
//         {/* {<ThreadCard/>} */}
//       </Box> 
//     </Box>
//     </Box>
    
//   )
// }

