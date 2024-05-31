import { Box, Button, Flex, Heading, Icon, Input, InputGroup, InputRightElement, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { SiAnimalplanet } from "react-icons/si";

export function Login() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Box m="auto" w="450px" p="10px 10px 10px 10px" mt="150px">
      {/* <Icon fontSize="150px" color="brand.900" as={SiAnimalplanet}/> */}
      <Heading fontSize="50px" color="brand.900" >Circle</Heading>
      <Heading size="lg" mb="15px" color="brand.800">Login to Circle</Heading>

        <Input placeholder='Email/Username' size='md' mb="13px" borderColor="white" color="white" />
        <InputGroup size='md' mb="10px">
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
    <Flex justifyContent="end" mb="10px">
      <Link color="brand.800">Forgot password?</Link>
    </Flex>

    <Button w="100%" bg="brand.900" borderRadius="20px" mb="10px" color="white">Login</Button>
      <Flex>
        <Text color="white">Don't have an account yet?</Text>
        <Link href='http://localhost:5173/create' color="brand.900" ml="5px">Create Account</Link>
      </Flex>
      
    </Box>
    
  )
}

