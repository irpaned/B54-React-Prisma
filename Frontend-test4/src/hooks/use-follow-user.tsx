import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../libraries/api";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "../redux/slices/auth";

export const useFollow = (id: number) => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth);
  const user = useSelector((state: any) => state.auth.user);
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
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["suggestsKey"] });
      queryClient.invalidateQueries({ queryKey: ["followingKey"] });
      queryClient.invalidateQueries({ queryKey: ["followerKey"] });
      queryClient.invalidateQueries({ queryKey: ["countFollowKey"] });
      const isUnfollow = response.data.count > 0; // Prisma mengembalikan jumlah record yang dihapus pada `deleteMany`
      // const isMyFollower = response.data.count > 0;
      dispatch(
        SET_USER({
          ...user,
          TotalFollowers: user.TotalFollowers + (isUnfollow ? -1 : 1),
          // TotalFolloweds: user.TotalFolloweds + (isMyFollower ? -1 : 1),
        })
      );
    },
  });

  const onFollow = async () => {
    await mutateAsync();
  };

  return { onFollow, isPending };
};
