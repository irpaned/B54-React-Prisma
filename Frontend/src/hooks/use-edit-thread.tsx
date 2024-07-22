import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../libraries/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { EditProfileSchema } from '../features/profile/validators/edit-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
import { useEffect } from "react";
// import { SET_USER } from '../redux/slices/auth';
import { ThreadEntity } from "../features/home/entities/thread-entity";
import { UpdateThread } from "../features/home/types/thread";
import { createThreadSchemaZod } from "../features/home/validators/thread-schema";

export const EditThread = (id: number) => {
  const { data: newThread, refetch } = useQuery<ThreadEntity[]>({
    queryKey: ["thread"],
    queryFn: getThread,
  });

  async function getThread() {
    const response = await api.get("/threads/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return response.data;
  }

  useEffect(() => {
    getThread();
  }, []);

  // console.log(currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateThread>({
    mode: "onSubmit",
    resolver: zodResolver(createThreadSchemaZod),
  });

  //   cundus
  const { mutateAsync } = useMutation({
    mutationFn: async (newThread) => {
      console.log(newThread);
      const response = await api.patch("/threads/" + id, newThread, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      return response;
    },
  });

  const onSubmit: SubmitHandler<UpdateThread> = async (data) => {
    try {
      console.log("menjalankan update threads");
      await mutateAsync(data as any); // cundus
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    newThread,
    onSubmit,
    register,
    handleSubmit,
    errors,
  };
};
