import { Box, BoxProps, Button, Flex, Heading, Icon, Input, InputGroup, InputRightElement, Link, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { SiAnimalplanet } from "react-icons/si";
import { api } from '../../../libraries/api';
import { SET_USER } from '../../../redux/slices/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


interface LoginFormProps extends BoxProps{}

type LoginForm = {
  email : string,
  password : string
}


export function LoginForm(props : LoginFormProps) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const [form, setForm] = useState<LoginForm>({
    email : "",
    password : ""
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      const response = await api.post("/auth/login", form)
      console.log("response" ,response.data);
      const user = response.data.user
      const token = response.data.token

      // cara bacanya apabila betulan token maka akan dimasukkan ke localstorage kita 1:21:05 day 8
      if(token) localStorage.setItem("token", token)
      if(user) {
        dispatch(SET_USER(user))
        navigate("/test-redux") // ini nanti ganti ke profile
      }
        
      
    } catch (error) {
      console.log(error);
      
    }

  }

  return (
    <Box m="auto" w="450px" p="10px 10px 10px 10px" mt="150px">
      {/* <Icon fontSize="150px" color="brand.900" as={SiAnimalplanet}/> */}
      <Heading fontSize="50px" color="brand.900" >Circle</Heading>
      <Heading size="lg" mb="15px" color="brand.800">Login to Circle</Heading>

        <Input 
        name='email'
        onChange={handleChange} 
        placeholder='Email/Username' 
        size='md' 
        mb="13px" 
        borderColor="white" 
        color="white" />
        <InputGroup size='md' mb="10px">
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
    <Flex justifyContent="end" mb="10px">
      <Link color="brand.800">Forgot password?</Link>
    </Flex>

    <Button onClick={handleSubmit} w="100%" bg="brand.900" borderRadius="20px" mb="10px" color="white">Login</Button>
      <Flex>
        <Text color="white">Don't have an account yet?</Text>
        <Link href='http://localhost:5173/create' color="brand.900" ml="5px">Create Account</Link>
      </Flex>
      
    </Box>
    
  )
}

