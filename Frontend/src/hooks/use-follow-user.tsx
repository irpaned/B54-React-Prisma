import { useMutation } from "@tanstack/react-query";
// import { FollowUserEntity } from "../features/user/types/follow-user-entity";
import { api } from "../libraries/api";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "../redux/slices/auth";
import { RootState } from "../redux/store";
export const useFollow = (followedId: number) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        "follow/" + followedId,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      dispatch(SET_USER(response.data));
      return response;
    },
  });

  const handleFollow = async () => {
    await mutateAsync();
  };

  return { handleFollow, isPending };
};
