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

export const useDataProfile = (id: number) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  // const dispatch = useDispatch()

  const { data: user, refetch } = useQuery<UserEntity[]>({
    queryKey: ["user"],
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

  //   cundus

  return {
    user,
  };
};
