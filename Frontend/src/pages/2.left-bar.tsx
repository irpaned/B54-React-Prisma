import { Box, Button, Container, Flex, Heading, HStack, Icon, Link, Spacer, Text, textDecoration } from '@chakra-ui/react'
import React from 'react'

import { FaRegHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { BiSolidHomeSmile } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { color } from 'framer-motion';



export function LeftBar() {

  const LinkCss = {
    ":hover" : {
      textDecoration: "none"
    }
  }

  const CssDivFlex = {
    mb: 5,
  }

  const IconCss = {
    fontSize: 30
  }

  const HeadingCss = {
    color: "brand.900",
    fontSize: 50
  }

  const buttonCreate = {
    bg: "brand.900",
    color: "brand.800", 
    width: 200,
    borderRadius: 30,
    fontSize: 20,
    h: "50px",
    w: "225px",
    fontWeight: "bold",
    p: "3px 10px 5px 10px",
    ":hover" : {
      bg: "brand.800",
      color : "black"
    }
  }

  return (
    <>
    
        <Box bg="black" w='400px' h="3000" color="white" p="20px 0 0 150px" m={0}>

        <Heading as="h1" sx={HeadingCss}>
            Circle
        </Heading>

        <Box mt="5">
          <Flex sx={CssDivFlex}>
            <HStack>
              <Link href="http://localhost:5173/login"><Icon sx={IconCss} as={BiSolidHomeSmile}/></Link>
              <Link href="http://localhost:5173/login" style={{fontSize: 20}} sx={LinkCss} >Home</Link>
            </HStack>
          </Flex>
          <Flex sx={CssDivFlex}>
          <HStack>
              <a href="#"><Icon sx={IconCss} as={IoSearch}/></a>
              <a style={{fontSize: 20}} href='#'>Search</a>
            </HStack>
          </Flex>
          <Flex sx={CssDivFlex}>
          <HStack>
              <Icon sx={IconCss} as={FaRegHeart}/>
              <a style={{fontSize: 20}} href='#'>Follow</a>
            </HStack>
          </Flex>
          <Flex sx={CssDivFlex}>
          <HStack>
              <Icon sx={IconCss} as={CgProfile}/>
              <a style={{fontSize: 20}} href='#'>Profile</a>
            </HStack>
          </Flex>
        </Box>
        
        <Button sx={buttonCreate}>Create Post</Button>
        </Box>
    </>
  )
}

