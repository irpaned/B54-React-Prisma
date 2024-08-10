import React from "react";
import { api } from "../../../libraries/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ResetPassword } from "../types/reset-password";
import { ResetPasswordSchema } from "../validators/reset-password";

export const useResetPasswordForm = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassword>({
    mode: "onChange",
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPassword> = async (data) => {
    try {
      const response = await api.patch("/auth/resetpassword", data);
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
