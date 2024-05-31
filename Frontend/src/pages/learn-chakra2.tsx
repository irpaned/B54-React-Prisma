import React from 'react'
import { Navbar } from '../components/navbar'
import { Box, SimpleGrid } from '@chakra-ui/react'

export function LearnChakra2() {
  return (
    <>
    <SimpleGrid columns={4} spacing={10} mt={10}>
      <Box h="200px" border="2px solid black">1</Box>
      <Box h="200px" border="2px solid black">2</Box>
      <Box h="200px" border="2px solid black">3</Box>
      <Box h="200px" border="2px solid black">4</Box>

      <Box h="200px" border="2px solid black">a</Box>
      <Box h="200px" border="2px solid black">b</Box>
      <Box h="200px" border="2px solid black">c</Box>
      <Box h="200px" border="2px solid black">d</Box>
      <Box h="200px" border="2px solid black">d</Box>
    </SimpleGrid>
    </>
  )
}


