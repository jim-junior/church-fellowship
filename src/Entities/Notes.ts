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
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.notes, {
    eager: true
  })
  @JoinColumn()
  user: User;
}

export const createNote = async (content: string, userId: number) => {
  const user = await User.findOne({
    where: {
      id: userId
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const note = new Note();
  note.content = content;
  note.user = user;
  await note.save();

  return note;
}

export const getNotes = async () => {
  const notes = await Note.find({
    relations: ["user"]
  });

  return notes;
}

export const getUserNotes = async (userId: number) => {
  const user = await User.findOne({
    where: {
      id: userId
    }
  });


  if (!user) {
    throw new Error("User not found");
  }

  const notes = await Note.createQueryBuilder("note")
    .where("note.user = :userId", { userId })
    .getMany();

  return notes;
}