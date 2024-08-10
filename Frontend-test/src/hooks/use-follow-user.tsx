import { useMutation } from "@tanstack/react-query";
import { api } from "../libraries/api";
export const useFollow = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (followedId: number) => {
      return await api.post(
        "follow/" + followedId,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
    },
  });

  const onFollow = async (id: number) => {
    await mutateAsync(id);
  };

  return { onFollow, isPending };
};
