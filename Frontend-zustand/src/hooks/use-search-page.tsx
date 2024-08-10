import { useQuery } from "@tanstack/react-query";
import { api } from "../libraries/api";
import { ThreadEntity } from "../features/home/entities/thread-entity";

export const useSearchPage = () => {
  const { data: search } = useQuery<ThreadEntity[]>({
    queryKey: ["searchProfile"],
    queryFn: getUser,
  });

  async function getUser() {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return response.data;
  }

  return {
    search,
  };
};
