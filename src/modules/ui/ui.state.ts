import { atom, useAtom } from "jotai";

const showCreateWorkspaceModalAtom = atom<boolean>(false);
const showCreateChannelModalAtom = atom<boolean>(false);
const showUserSerachModalAtom = atom<boolean>(false);
export const useUiStore = () => {
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useAtom(
    showCreateWorkspaceModalAtom
  );

  const [showCreateChannelModal, setShowCreateChannelModal] = useAtom(
    showCreateChannelModalAtom
  );

  const [showUserSerachModal, setShowUserSerachModal] = useAtom(
    showUserSerachModalAtom
  );
  return {
    showCreateWorkspaceModal,
    setShowCreateWorkspaceModal,
    showCreateChannelModal,
    setShowCreateChannelModal,
    showUserSerachModal,
    setShowUserSerachModal,
  };
};
