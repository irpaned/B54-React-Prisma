import { useMutation, useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { ThreadEntity } from "../features/home/entities/thread-entity";
import { CreateThreadDTO } from "../features/home/types/thread";
import { api } from "../libraries/api";

export const useSearchPage = () => {
  const { data: search, refetch } = useQuery<ThreadEntity[]>({
    queryKey: ["search"],
    queryFn: getUser,
  });

  // 👇 (TanStack query untuk get data step 2)
  async function getUser() {
    const response = await api.get("/users", {
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
    ":active": {
      color: "black",
      bg: "#ACACAC",
    },
  };

  return {
    search,
  };
};
