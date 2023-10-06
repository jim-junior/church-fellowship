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
export class Testimony extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  testimony: string;

  @CreateDateColumn()
  created_at: Date;

  // user 
  @ManyToOne(() => User, user => user.testimonies)
  user: User;
}


export const createTestimony = async (
  user_id: number,
  testimony: string
) => {
  const user = await User.findOne({
    where: { id: user_id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const newTestimony = new Testimony();
  newTestimony.testimony = testimony;
  newTestimony.user = user;

  await newTestimony.save();

  return newTestimony;
}

export const getTestimonies = async () => {
  const testimonies = await Testimony.find({
    relations: ["user"],
    order: {
      created_at: "DESC"
    }
  });

  return testimonies;
}

export const getTestimonyById = async (id: number) => {
  const testimony = await Testimony.findOne({
    where: { id },
    relations: ["user"],
  });

  return testimony;
}

export const getTestimoniesByUser = async (userid: number) => {
  const user = await User.findOne({
    where: { id: userid },
    relations: ["testimonies"],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.testimonies;
}
