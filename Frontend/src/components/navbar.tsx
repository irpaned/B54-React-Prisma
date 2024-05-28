import { Box, Button, Flex, Heading, HStack, Spacer, Text } from '@chakra-ui/react'
import React from 'react'

export function Navbar() {
  return (
    <Flex bg="black" color="white" height="60px"  gap="20px">
                <Heading as="h1">Genius Komputer</Heading>
                <Spacer/>


                <HStack>
                    <Box bg="gray.100" color="black" p="10px">M</Box>
                    <Text>muhammadirfan@gmail.com</Text>
                    <Button colorScheme="green">Log Out</Button>
                </HStack>

                

            </Flex>
  )
}

