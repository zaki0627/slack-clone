import { atom, useAtom } from "jotai";
import type { User } from "./users/user.entity";

const currentuserAtom = atom<User>();
export const userCurrentUserStore = () => {
  const [currentUser, setCurrentUser] = useAtom(currentuserAtom);
  return { currentUser, setCurrentUser };
};
