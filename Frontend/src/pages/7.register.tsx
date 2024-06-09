import { Box, Button, Flex, Heading, Input, InputGroup, InputRightElement, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { RegisterForm } from '../features/auth/component/register'

export function Register() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <RegisterForm/>
  )
}

