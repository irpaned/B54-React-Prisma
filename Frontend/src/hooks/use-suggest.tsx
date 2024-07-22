import { useQuery } from "@tanstack/react-query";
import { api } from "../libraries/api";
import { SuggestEntity } from "../features/suggest/entities/suggest-entity";

export const useSuggest = () => {
  const { data: suggests } = useQuery<SuggestEntity[]>({
    queryKey: ["suggestsKey"],
    queryFn: getUserData,
  });

  async function getUserData() {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    console.log("data users", response.data);

    return response.data;
  }

  return {
    suggests,
  };
};
