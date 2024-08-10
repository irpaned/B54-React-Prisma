import React, { useState } from "react";
import { api } from "../../../libraries/api";
import { RegisterForm } from "../types/register-form";
// import { useToast } from '@chakra-ui/react'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { RegisterSchema } from "../validators/register-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useRegisterForm = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    userName: "",
    fullName: "",
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      console.log("response", response.data);

      const token = response.data.token;

      // cara bacanya apabila betulan token maka akan dimasukkan ke localstorage kita 1:21:05 day 8
      if (token) {
        localStorage.setItem("token", token);
      }
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    register,
    handleSubmit,
    handleClick,
    show,
    setShow,
    errors,
    onSubmit,
  };
};
