import { Box, Button, Container, filter, Flex, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import { color } from "framer-motion";
import React from "react";

export function LearnChakra () {
    
    const boxStylex = {
        bg: "black",
        color: "white",
        p: "10px 20px 10px 20px",
        textAlign: "center",
        mt: "0",
        filter: "blur(1px)",
        ":hover": {
            filter: "blur(0px)",
            bg: "blue.900"
        }

    }
    
    return (
        <>

            
           <Container as="div" maxWidth="4x1" mt="20">
           <Heading>Hello World</Heading>
            <Text ml="20" fontWeight="bold" color="green">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima provident optio tenetur quis id assumenda, voluptates exercitationem esse blanditiis commodi vel et vero, architecto nam?</Text>
            
            
            <Box my={10} p="10px 20px 10px 20px" bg="orangered">
                <Text color="white">This is a box</Text>
            </Box>

            <Box sx={boxStylex}>
                Hello World
            </Box>
            </Container> 

           <Flex bg="yellow" justify="space-around" wrap="wrap" gap="2" mt="20px">
            <Box bg="red" width="100px" height="50px" textAlign="center" flexGrow="1" lineHeight="50px">1</Box>
            <Box bg="blue" width="100px" height="50px" textAlign="center" flexGrow="2" lineHeight="50px">2</Box>
            <Box bg="green" width="100px" height="50px" textAlign="center" flexGrow="3" lineHeight="50px">3</Box>
            <Box bg="gray" width="100px" height="50px" textAlign="center" flexGrow="4" lineHeight="50px">4</Box>
           </Flex>
            
            
        </>

    )
        

   
}