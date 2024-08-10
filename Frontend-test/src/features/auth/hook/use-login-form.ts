import { useToast } from '@chakra-ui/react';
import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../libraries/api';
import { SET_USER } from '../../../redux/slices/auth';
import { LoginType } from "../types/login-type";
import {  LoginSchemaZod } from "../validators/login-form";


export const useLoginForm = () => {
  // ini bawaan chakra ui untuk show password
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

 // ini toast dari chakra ui
  const toast = useToast()

  // redux
  const dispatch = useDispatch()

  const navigate = useNavigate()

  // React hook form👇
  const { register,  handleSubmit, formState : {errors} } = useForm<LoginType>({
      mode : 'onChange',
      resolver : zodResolver(LoginSchemaZod)
  })

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {      
      const response = await api.post("/auth/login", data)
      console.log("response" ,response.data);
      const user = response.data.user
      const token = response.data.token
      
      // cara bacanya apabila betulan token maka akan dimasukkan ke localstorage kita (1:21:05 day 8)
      if(token) localStorage.setItem("token", token)
      if(user) {
        dispatch(SET_USER(user))
        toast({
          title: 'Login Success!',
          // description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        navigate("/") // navigate : berfungsi ketika sudah log in akan langsung di arahkan ke halaman home
      }
    } catch (error) {
      toast({
        title: 'Email or Password is wrong!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log("ini error",error);
      
    }
    
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    handleClick,
    show, 
    setShow
  }

}

