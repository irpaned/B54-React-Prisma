import { useQuery } from "@tanstack/react-query";
import { api } from "../libraries/api";
import { countFollowEntity } from "../features/home/entities/follow-entity";

export const useCountFollow = (userId: number) => {
  const { data: countFollow } = useQuery<countFollowEntity>({
    queryKey: ["countFollowKey"],
    queryFn: getCountFollow,
  });

  async function getCountFollow() {
    const response = await api.get("/count-follow/" + userId, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return response.data[0];
  }

  return {
    countFollow,
  };
};
