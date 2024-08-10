import create from "zustand";

type User = {
  id: number;
  userName: string;
  fullName: string;
  email: string;
  photoProfile: string;
  bio: string;
  TotalFollowers: number;
  TotalFolloweds: number;
};

type Store = {
  user: User;
  SET_USER: (newUser: User) => void;
};

const useStore = create<Store>()((set) => ({
  user: {
    id: 0,
    userName: "",
    fullName: "",
    email: "",
    photoProfile: "",
    bio: "",
    TotalFollowers: 0,
    TotalFolloweds: 0,
  },

  SET_USER: (newUser: User) => set({ user: newUser }),
}));

export default useStore;
