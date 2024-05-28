import { Flex } from "@chakra-ui/react"
import React from "react"
import { Routes } from "react-router-dom"
import { LeftBar } from "../pages/2.left-bar"
import { CardBeranda } from "../pages/1.card"
import { RightBar } from "../pages/3.right-bar"


export default function Home() {
  return (
    <>
      <Flex>
          <LeftBar/> 
          <CardBeranda/> 
          <RightBar/>
      </Flex>

</>
     
    
  )
}
