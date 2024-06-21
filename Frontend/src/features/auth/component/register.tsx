import { Box, BoxProps, Button, Flex, Heading, Input, InputGroup, InputRightElement, Link, Text } from '@chakra-ui/react'

import { useRegisterForm } from '../hook/use-register-form'


interface RegisterFormProps extends BoxProps{}

type RegisterForm = {
  userName : string,
  fullName : string,
  email : string,
  password : string
}


export function RegisterForm(props : RegisterFormProps) {
  
  const {handleClick, handleSubmit, show, errors, onSubmit, register} = useRegisterForm()
  


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Box m="auto" w="450px" p="10px 10px 10px 10px" mt="150px">
      <Heading fontSize="50px" color="brand.900" >Circle</Heading>
      <Heading size="lg" mb="15px" color="brand.800">Create account Circle</Heading>

        <Input 
        {...register("fullName")}
        placeholder='Full Name' size='md' mb="7px" borderColor="white" color="white" />
        <Text color={"red"}>{errors.fullName?.message}</Text>
        <Input 
        {...register("userName")}
        placeholder='User Name' size='md' mt="7px" mb="7px" borderColor="white" color="white" />
        <Text color={"red"}>{errors.userName?.message}</Text>
        <Input 
        {...register("email")}
        placeholder='Email' size='md' mt="7px" mb="7px" borderColor="white" color="white" />
        <Text color={"red"}>{errors.email?.message}</Text>
        <InputGroup size='md' mt="7px" mb="7px">
      <Input
        {...register("password")}
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
    <Text color={"red"}>{errors.password?.message}</Text>
    <Button 
    isDisabled={!!(errors.email?.message || errors.password?.message)}
    type='submit'
    w="100%" 
    bg="brand.900" 
    borderRadius="20px" 
    mt="7px"
    mb="10px" 
    color="white">Create</Button>
      <Flex>
        <Text color="white">Already have account?</Text>
        <Link href='http://localhost:5173/auth/login' color="brand.900" ml="5px">Login</Link>
      </Flex>
      
    </Box>
    </form>
  )
}

