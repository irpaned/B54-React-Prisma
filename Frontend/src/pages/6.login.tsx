import { Box, Button, Flex, Heading, Icon, Input, InputGroup, InputRightElement, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { LoginForm } from '../features/auth/component/login'



export function Login() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <>
    <LoginForm/>
    </>
  )

 
}

