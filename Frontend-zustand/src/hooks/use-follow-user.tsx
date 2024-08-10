import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../libraries/api";
export const useFollow = (id: number) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      return await api.post(
        "follow/" + id,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestsKey"] });
    },
  });

  const onFollow = async () => {
    await mutateAsync();
  };

  return { onFollow, isPending };
};
