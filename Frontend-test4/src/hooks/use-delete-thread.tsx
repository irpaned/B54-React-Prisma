import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { ThreadEntity } from "../features/home/entities/thread-entity";
import { api } from "../libraries/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DeleteThread = (id: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 👇 Menggunakan TanStack query (TanStack query untuk get data step 1)
  const { data: deleteThread, refetch } = useQuery<ThreadEntity[]>({
    queryKey: ["DeleteThreads"],
    queryFn: getThreads,
  });

  async function getThreads() {
    const response = await api.get("/threads" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return response.data;
  }

  useEffect(() => {
    getThreads();
  }, []);

  // karena kita ingin menggunakan post maka pakai useMutation
  const { mutateAsync } = useMutation({
    mutationFn: async (deleteThread) => {
      console.log(deleteThread);
      const response = await api.delete("/threads/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threadsKey"] });
      // queryClient.invalidateQueries({ queryKey: ["mythreads"] });
    },
  });

  const onDelete: SubmitHandler<any> = async (data) => {
    try {
      await mutateAsync(data as any);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

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
    deleteThread,
    onDelete,
  };
};
