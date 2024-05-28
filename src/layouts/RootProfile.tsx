import { Flex } from '@chakra-ui/react'
import React from 'react'
import { LeftBar } from '../pages/2.left-bar'
import { RightBar } from '../pages/3.right-bar'
import { MyProfile } from '../pages/4.profile'

export default function Profile() {
    return (
      <>
        <Flex>
            <LeftBar/> 
            <MyProfile/>
            <RightBar/>
        </Flex>
  
  </>
       
      
    )
  }

