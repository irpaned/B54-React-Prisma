import { Flex } from "@chakra-ui/react"
import React from "react"
import { CardBeranda } from "../pages/1.card"
import { LeftBar } from "../pages/2.left-bar"
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


