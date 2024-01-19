import { create } from "zustand";

type UserState = {
  refetchFlag: boolean;
  setRefetchFlag: (refetchFlag: boolean) => void;
};

const useUserStore = create<UserState>((set) => ({
  refetchFlag: false,
  setRefetchFlag: (refetchFlag: boolean) => set(() => ({ refetchFlag })),
}));

export default useUserStore;
