// import { Avatar, Box, Button, Flex, HStack, Icon, Input, WrapItem } from "@chakra-ui/react"
// import React from "react"
// import { SubmitHandler, useForm } from "react-hook-form"
// import { FaImage } from "react-icons/fa"
// import { createThreadSchema } from "../validators/thread-schema"
// import { ZodAny, ZodObject, ZodString, ZodTypeAny } from "zod"
// import { CreateThreadDTO } from "../types/thread"
// import { useMutation } from "@tanstack/react-query"
// import { api } from "../../../libraries/api"
// import { ThreadEntity } from "../entities/thread"
// import { AxiosError } from "axios"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { CardBeranda } from "../../../pages/1.card"


// export function InputFileCard () {

//     // Menggunakan react hook form
//     const { register, handleSubmit } 
//         = useForm<CreateThreadDTO>({
//           mode : 'onSubmit',
//           resolver: zodResolver(createThreadSchema)
//       })

      

//     // 👇 Menggunakan TanStack query
//     // karena kita ingin menggunakan post maka pakai useMutation
//     const { mutateAsync } = useMutation<
//     ThreadEntity, 
//     AxiosError, 
//     CreateThreadDTO>({
//         mutationFn: (newThread) => {
//             const formData = new FormData();
//             formData.append("content", newThread.content);
//             formData.append("image", newThread.image[0]);
//             console.log(newThread);
//             return api.post("/threads", formData, {
//                 headers : {
//                     Authorization : `Bearer ${localStorage.token}`
//                 }
//             })
//         }
//     })
// //   setelah setting di atas ini jangan lupa register pada input

//      const onSubmit: SubmitHandler<CreateThreadDTO> = async (data) => {
//        try {
//         await mutateAsync(data)
//        } catch (error) {
//         console.log(error);
//        }
//     }

//     const BoxCSS = {
//         border: "1px solid rgb(47, 51, 54)",
//         borderTop: "none",
//         borderRight: "none",
//         borderLeft: "none",
//         p: "20px 15px 20px 15px"
//       }

//       const ButtonPost = {
//         bg: "brand.900",
//         color: "white",
//         borderRadius: 30,
//         p: "0px 20px 1px 20px",
//         ":hover" : {
//           bg: "white",
//           color : "black"
//         }
//       }

// return (
//     <Box sx={BoxCSS}>
//     <Flex bg="black" mt="5">
//         <HStack>
//             <WrapItem>
//                 <Avatar size='md' name='Ryan Florence' src='https://images.pexels.com/photos/832908/pexels-photo-832908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />{' '}
//             </WrapItem>
//             <form onSubmit={handleSubmit(onSubmit)}>
//             <Input 
//             {...register("image")}
//             type="file" w="380px" placeholder='What is Happening?' border="none" color="white" />
//             <Input 
//             {...register("content")}
//             w="380px" placeholder='What is Happening?' border="none" color="white" />
//             <Icon color="brand.900" fontSize={25} as={FaImage}></Icon>
//             <Button type='submit' sx={ButtonPost}>Post</Button>
//             </form>
//         </HStack>
//     </Flex>
//     </Box>
// )


// }

