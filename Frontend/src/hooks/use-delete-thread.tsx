import { useMutation, useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { ThreadEntity } from "../features/home/entities/thread-entity";
import { api } from "../libraries/api";
import { useEffect } from "react";

export const DeleteThread = (id: number) => {
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
  });

  const onDelete: SubmitHandler<any> = async (data) => {
    try {
      await mutateAsync(data as any);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    deleteThread,
    onDelete,
  };
};
