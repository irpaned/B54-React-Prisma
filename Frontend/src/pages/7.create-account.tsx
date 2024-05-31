import { Box, Button, Flex, Heading, Input, InputGroup, InputRightElement, Link, Text } from '@chakra-ui/react'
import React from 'react'

export function CreateAccount() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Box m="auto" w="450px" p="10px 10px 10px 10px" mt="150px">
      <Heading fontSize="50px" color="brand.900" >Circle</Heading>
      <Heading size="lg" mb="15px" color="brand.800">Create account Circle</Heading>

        <Input placeholder='Full Name' size='md' mb="13px" borderColor="white" color="white" />
        <Input placeholder='Email' size='md' mb="13px" borderColor="white" color="white" />
        <InputGroup size='md' mb="13px">
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Password'
        color="white"
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick} borderRadius="20px">
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
    <Button w="100%" bg="brand.900" borderRadius="20px" mb="10px" color="white">Create</Button>
      <Flex>
        <Text color="white">Already have account?</Text>
        <Link href='http://localhost:5173/login' color="brand.900" ml="5px">Login</Link>
      </Flex>
      
    </Box>
    
  )
}

