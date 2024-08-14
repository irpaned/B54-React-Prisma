import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../../libraries/api";
import { SET_USER } from "../../../redux/slices/auth";
import { LoginType } from "../types/login-type";
import { LoginSchemaZod } from "../validators/login-form";
import { RootState } from "../../../redux/store";

export const useLoginForm = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchemaZod),
  });

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      const user = response.data.user;
      const token = response.data.token;

      if (token) localStorage.setItem("token", token);
      if (user) {
        toast({
          title: "Login Success!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate("/");
        // navigate : berfungsi ketika sudah log in akan langsung di arahkan ke halaman home
      }
    } catch (error) {
      toast({
        title: "Email or Password is wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("ini error", error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    handleClick,
    show,
    setShow,
  };
};
