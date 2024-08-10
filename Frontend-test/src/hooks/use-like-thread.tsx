import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikeThreadEntity } from "../features/profile/entities/like-thread-entity";
import { api } from "../libraries/api";

export const useLike = (threadId: number) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation<LikeThreadEntity>({
    mutationFn: async () => {
      return await api.post(
        "like/" + threadId,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threadsKey"] });
      queryClient.invalidateQueries({ queryKey: ["mythreads"] });
    },
  });

  const handleLikeThread = async () => {
    await mutateAsync();
  };

  return { handleLikeThread };
};
