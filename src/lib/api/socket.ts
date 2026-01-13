import { io } from "socket.io-client";
import { Message } from "../../modules/messages/message.entity";

const baseUrl = import.meta.env.VITE_API_URL;
const socket = io(baseUrl);

export const subscribe = (
  workspaceId: string,
  onNewMessage: (message: Message) => void,
  onDeletemessage: (messageId: string) => void
) => {
  socket.emit("join-workspace", workspaceId);
  socket.on("new-message", (message: Message) => {
    onNewMessage(new Message(message));
  });

  socket.on("delete-message", onDeletemessage);
};

export const unsubscribe = (workspaceId: string) => {
  socket.emit("leave-workspace", workspaceId);
  socket.off("new-message");
  socket.off("delete-message");
};
