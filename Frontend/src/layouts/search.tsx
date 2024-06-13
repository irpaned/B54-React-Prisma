import { Flex } from "@chakra-ui/react";
import { LeftBar } from "../pages/2.left-bar";
import { RightBar } from "../pages/3.right-bar";
import React from "react";
import { SearchPage } from "../pages/8.search";

export default function Search() {


    return (
      
  
        <Flex>
            <LeftBar/> 
            <SearchPage/>
            <RightBar/>
        </Flex>
  
      
       
    )
  }