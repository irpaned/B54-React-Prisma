import React, { useState } from "react";
import { api } from "../../../libraries/api";
import { ResetForm } from "../types/reset-form";
// import { useToast } from '@chakra-ui/react'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ResetFormSchema } from "../validators/reset-form";

export const useResetForm = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  // const toast = useToast()
  // const dispatch = useDispatch()
  // const navigate = useNavigate()

  const [form, setForm] = useState<ResetForm>({
    email: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({
    mode: "onChange",
    resolver: zodResolver(ResetFormSchema),
  });

  const onSubmit: SubmitHandler<ResetForm> = async (data) => {
    try {
      const response = await api.post("/auth/reset-password", data);
      console.log("response", response.data);

      const token = response.data.token;

      // cara bacanya apabila betulan token maka akan dimasukkan ke localstorage kita 1:21:05 day 8
      if (token) {
        localStorage.setItem("token", token);
      }
      navigate("/auth/reset");
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
