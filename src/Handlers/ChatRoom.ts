import { Server, Socket } from "socket.io";
import { getChatRoomMessages, createMessage, getMessagesBtnUsers, markMessagesAsRead } from "../Entities/Message";

type Msg = {
  content: string;
  type: string;
  senderId: number;
  recieverId?: number;
}

export function handleChatRoom(io: Server, socket: Socket) {
  socket.on("chatroom:join", async () => {
    const latestMessages =await getChatRoomMessages();
    socket.join("chatroom");
    socket.emit("chatroom:latestMessages", latestMessages);
  });

  socket.on("chatroom:message", async (msg: Msg) => {
    const message = await createMessage(msg.content, msg.type, msg.senderId, msg.recieverId);
    io.to("chatroom").emit("chatroom:message", message);
    
  });

}



export function handleUserChat(io: Server, socket: Socket) {

  socket.on("userchat:join", async (users: {
    senderId: number;
    recieverId: number;
  }) => {
    const latestMessages = await getMessagesBtnUsers(users.senderId, users.recieverId);
    socket.join(`userchat:${users.senderId}:${users.recieverId}`);
    socket.join(`userchat:${users.recieverId}:${users.senderId}`);
    socket.emit("userchat:latestMessages", latestMessages);

  })

  socket.on("userchat:message", async (msg: Msg) => {
    const message = await createMessage(msg.content, msg.type, msg.senderId, msg.recieverId);
    io.to(`userchat:${msg.senderId}:${msg.recieverId}`).emit("userchat:message", message);
  })

  socket.on("message:read", async (msgId) => {
    await markMessagesAsRead(msgId);
  })


}