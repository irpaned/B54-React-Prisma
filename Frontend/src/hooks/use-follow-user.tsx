import { useMutation } from "@tanstack/react-query";
import { FollowUserEntity } from "../features/user/types/follow-user-entity";
import { api } from "../libraries/api";
export const useFollow = (followedId: number) => {
  const { mutateAsync } = useMutation<FollowUserEntity>({
    mutationFn: async () => {
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

  const handleFollow = async () => {
    await mutateAsync();
  };

  return { handleFollow };
};
