import { Box, BoxProps, Button, Flex, Heading, Input, InputGroup, InputRightElement, Link, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { api } from '../../../libraries/api'


interface RegisterFormProps extends BoxProps{}

type RegisterForm = {
  userName : string,
  fullName : string,
  email : string,
  password : string
}


export function RegisterForm(props : RegisterFormProps) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const [form, setForm] = useState<RegisterForm>({
    userName : "",
    fullName : "",
    email : "",
    password : ""
  });

  function handleChange (event : React.ChangeEvent<HTMLInputElement> ) {
    const name = event.target.name
    const value = event.target.value

    console.log(name);
    console.log(value);
    
    
    setForm({
      ...form,
      [name] : value
    })
  }

  
  async function handleSubmit () {
    try {      
      const response = await api.post("/auth/register", form)
      console.log("response", response.data);

      const token = response.data.token
      
      

      // cara bacanya apabila betulan token maka akan dimasukkan ke localstorage kita 1:21:05 day 8
      if(token) {
        localStorage.setItem("token", token)
      }

    } catch (error) {
      console.log(error);
      
    }

  }

  return (
    <Box m="auto" w="450px" p="10px 10px 10px 10px" mt="150px">
      <Heading fontSize="50px" color="brand.900" >Circle</Heading>
      <Heading size="lg" mb="15px" color="brand.800">Create account Circle</Heading>

        <Input 
        name='fullName' 
        onChange={handleChange} 
        placeholder='Full Name' size='md' mb="13px" borderColor="white" color="white" />
        <Input 
        name='userName' 
        onChange={handleChange} 
        placeholder='User Name' size='md' mb="13px" borderColor="white" color="white" />
        <Input 
        name='email' 
        onChange={handleChange} 
        placeholder='Email' size='md' mb="13px" borderColor="white" color="white" />
        <InputGroup size='md' mb="13px">
      <Input
        name='password'
        onChange={handleChange}
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
    <Button onClick={handleSubmit} w="100%" bg="brand.900" borderRadius="20px" mb="10px" color="white">Create</Button>
      <Flex>
        <Text color="white">Already have account?</Text>
        <Link href='http://localhost:5173/login' color="brand.900" ml="5px">Login</Link>
      </Flex>
      
    </Box>
    
  )
}

