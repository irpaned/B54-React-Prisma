import { useQuery } from "@tanstack/react-query";
import { api } from "../libraries/api";
import { ThreadEntity } from "../features/home/entities/thread-entity";

export const useProfilePage = (userId: number) => {
  const { data: threads } = useQuery<ThreadEntity[]>({
    queryKey: ["mythreads"],
    queryFn: getThreads,
  });

  async function getThreads() {
    const response = await api.get("/threads/profile/" + userId, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return response.data;
  }

  const BoxCSS = {
    border: "1px solid rgb(47, 51, 54)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    p: "20px 15px 20px 15px",
  };

  const ButtonPost = {
    bg: "brand.900",
    color: "white",
    borderRadius: 30,
    p: "0px 20px 1px 20px",
    ":hover": {
      bg: "white",
      color: "black",
    },
  };

  return {
    threads,
    BoxCSS,
    ButtonPost,
  };
};
