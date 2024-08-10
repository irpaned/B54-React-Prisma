import { useMutation, useQuery } from "@tanstack/react-query";
import { UserEntity } from "../features/home/entities/user-entity";
import { api } from "../libraries/api";
import { EditProfileForm } from "../features/profile/types/edit-profile";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "../features/profile/validators/edit-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { SET_USER } from "../redux/slices/auth";

export const EditProfile = (id: number) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const { data: user, refetch } = useQuery<UserEntity[]>({
    queryKey: ["EditProfile"],
    queryFn: getUser,
  });

  async function getUser() {
    const response = await api.get("/user/" + id);
    return response.data;
  }

  useEffect(() => {
    getUser();
  }, []);

  console.log(currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>({
    mode: "onSubmit",
    resolver: zodResolver(EditProfileSchema),
  });

  //   cundus
  const { mutateAsync } = useMutation({
    mutationFn: async (newUser) => {
      console.log(newUser);
      const response = await api.patch("/user/" + id, newUser); // newUser yg ada di dalam parameter untuk apa?
      dispatch(SET_USER(response.data));
      return response;
    },
  });

  const onSubmit: SubmitHandler<EditProfileForm> = async (data) => {
    try {
      console.log("menjalankan update profile");
      await mutateAsync(data as any); // cundus
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    onSubmit,
    register,
    handleSubmit,
    errors,
  };
};
