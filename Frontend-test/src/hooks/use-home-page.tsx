import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { ThreadEntity } from "../features/home/entities/thread-entity";
import { CreateThreadDTO } from "../features/home/types/thread";
import { createThreadSchemaZod } from "../features/home/validators/thread-schema";
import { api } from "../libraries/api";

export const useHomePage = () => {
  // untuk bagian fetch
  const { data: threads, refetch } = useQuery<ThreadEntity[]>({
    queryKey: ["threadsKey"],
    queryFn: getThreads,
  });

  async function getThreads() {
    const response = await api.get("/threads", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return response.data;
  }
  // untuk bagian fetch />

  // untuk bagian ambil data dari input
  const { register, handleSubmit } = useForm<CreateThreadDTO>({
    mode: "onSubmit",
    resolver: zodResolver(createThreadSchemaZod),
  });

  const { mutateAsync } = useMutation<
    ThreadEntity,
    AxiosError,
    CreateThreadDTO
  >({
    mutationFn: (newThread) => {
      const formData = new FormData();
      formData.append("content", newThread.content);
      if (newThread.image[0]) {
        formData.append("image", newThread.image[0]);
      }
      console.log(newThread);
      return api.post("/threads", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
    },
  });

  const onSubmit: SubmitHandler<CreateThreadDTO> = async (data) => {
    try {
      await mutateAsync(data);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // untuk bagian ambil data dari input />

  const BoxCSS = {
    border: "1px solid rgb(47, 51, 54)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    p: "20px 15px 20px 15px",
  };

  const ButtonPost = {
    bg: "brand.900",
    color: "white",
    borderRadius: 30,
    p: "0px 20px 1px 20px",
    ":hover": {
      bg: "white",
      color: "black",
    },
    ":active": {
      color: "black",
      bg: "#ACACAC",
    },
  };

  return {
    threads,
    BoxCSS,
    ButtonPost,
    onSubmit,
    register,
    handleSubmit,
  };
};
