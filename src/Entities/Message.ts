import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
    Generated,
    CreateDateColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;


  @CreateDateColumn()
  created_at: Date;

  @Column()
  type: string;

  @ManyToOne(() => User, user => user.sent_messages, {
    eager: true
  })
  @JoinColumn()
  sender: User;

  @ManyToOne(() => User, user => user.recieved_messages, {
    eager: true,
    nullable: true
  })
  @JoinColumn()
  reciever: User;

  @Column({
    nullable: true,
    default: true
  })
  unread: boolean;
}



export const createMessage = async (content: string, type: string, senderId: number, recieverId?: number) => {
  const sender = await User.findOne({
    where: {
      id: senderId
    }
  });
  let reciever = null;
  if (recieverId) {
    reciever = await User.findOne({
      where: {
        id: recieverId
      }
    });
  }

  if (!sender) {
    throw new Error("Sender not found");
  }


  const message = new Message();
  message.content = content;
  message.type = type;
  message.sender = sender;
  if (reciever) {
    message.reciever = reciever;
  }
  await message.save();
  return message;
}

export const getChatRoomMessages = async (page = 1) => {
  const messages = await Message.find({
    where: {
      type: "chatroom"
    },
    order: {
      created_at: "DESC"
    },
    take: 30 * page
  });
  return messages;
}

export const getMessagesBtnUsers = async (senderId: number, recieverId: number, page = 1) => {
  const sender = await User.findOne({
    where: {
      id: senderId
    }
  });

  const reciever = await User.findOne({
    where: {
      id: recieverId
    }
  });

  if (!sender || !reciever) {
    throw new Error("Sender or Reciever not found");
  }


    const messages = await Message.createQueryBuilder("message")
    .leftJoinAndSelect("message.sender", "sender")
    .leftJoinAndSelect("message.reciever", "reciever")
    .where("message.sender = :sender AND message.reciever = :reciever", {
      sender: sender.id,
      reciever: reciever.id
    })
    .orWhere("message.sender = :reciever AND message.reciever = :sender", {
      sender: sender.id,
      reciever: reciever.id
    })
    .orderBy("message.created_at", "DESC")
    .take(30 * page)
    .getMany();

    // set all messages to read
    messages.forEach(async (message) => {
      if (message.unread && message.reciever.id === sender.id) {
        message.unread = false;
        await message.save();
      }
    });


  return messages;
}

// A function that gets users that have sent messages to the current user and vice versa, and returns them with the latest message sent between them and number of unread messages
export const getChatUsers = async (userId: number) => {
  const user = await User.findOne({
    where: {
      id: userId
    },
    relations: ["sent_messages", "recieved_messages"]
  });

  if (!user) {
    throw new Error("User not found");
  }

  const users = await User.createQueryBuilder("user")
    .leftJoinAndSelect("user.sent_messages", "sent_messages")
    .leftJoinAndSelect("user.recieved_messages", "recieved_messages")
    .where("sent_messages.reciever = :id AND sent_messages.type = :type", {
      id: user.id,
      type: "userchat"
    })
    .orWhere("recieved_messages.sender = :id  AND recieved_messages.type = :type", {
      id: user.id,
      type: "userchat"
    })
    .getMany();

  const chatUsers = users.map((user) => {
    let latestRecievedMessage = null;
    let lastMessage : Message | null = null
    let unreadMessages = 0;
    if (user.recieved_messages.length > 0) {
      latestRecievedMessage = user.recieved_messages.reverse()[0];
      //unreadMessages = user.recieved_messages.filter((message) => message.unread).length;
    }
    if (user.sent_messages.length > 0) {
      unreadMessages = user.sent_messages.filter((message) => message.unread).length;
    }
      
    const lastSentMessage = user.sent_messages.length > 0 ? user.sent_messages.reverse()[0] : null;

    if (latestRecievedMessage && lastSentMessage) {
      if (latestRecievedMessage.created_at > lastSentMessage.created_at) {
        lastMessage = latestRecievedMessage;
      } else {
        lastMessage = lastSentMessage;
      }
    } else if (latestRecievedMessage) {
      lastMessage = latestRecievedMessage;
    } else if (lastSentMessage) {
      lastMessage = lastSentMessage;
    }
    return {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      profile_picture: user.profile_picture,
      latestMessage:lastMessage,
      unreadMessages
    }
  });

  return chatUsers;
}

export const markMessagesAsRead = async (messageId: number) => {
  const message = await Message.findOne({
    where: {
      id: messageId
    }
  });

  if (!message) {
    throw new Error("Message not found");
  }

  message.unread = false;
  await message.save();

  return message;
}


export const getMessageById = async (id: number) => {
  const message = await Message.findOne({
    where: {
      id
    }
  });


  return message;
}

export const getLatestChatRoomMessage = async () => {
  return await Message.findOne({
    where: {
      type: "chatroom"
    },
    order: {
      created_at: "DESC"
    }
  });
}