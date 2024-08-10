import { Box, BoxProps, Button, Flex, Heading, Input, InputGroup, InputRightElement, Link, Text } from '@chakra-ui/react'

import { useRegisterForm } from '../hook/use-register-form'


interface ResetFormProps extends BoxProps{}

type ResetForm = {
  newPassword : string,
  password : string
}


export function ResetForm(props : ResetFormProps) {
  
  const {handleClick, handleSubmit, show, errors, onSubmit, register} = useRegisterForm()
  


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Box m="auto" w="450px" p="10px 10px 10px 10px" mt="150px">
      <Heading fontSize="50px" color="brand.900" >Circle</Heading>
      <Heading size="lg" mb="15px" color="brand.800">Reset Password</Heading>

        <InputGroup size='md' mt="7px" mb="7px">
    <Input
        {...register("password")}
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='New Password'
        color="white"
      />
    </InputGroup>
    <InputGroup size='md' mt="7px" mb="7px">
      <Input
        {...register("password")}
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Confirm New Password'
        color="white"
      />   
    </InputGroup>
    
    <Button h='1.75rem' size='sm' onClick={handleClick} borderRadius="20px">
          {show ? 'Hide' : 'Show'}
    </Button>
    <Text color={"red"}>{errors.password?.message}</Text>
    <Button 
        isDisabled={!!(errors.email?.message || errors.password?.message)}
        type='submit'
        w="100%" 
        bg="brand.900" 
        borderRadius="20px" 
        mt="7px"
        mb="10px" 
        color="white">Create New Password
    </Button>
      
    </Box>
    </form>
  )
}

