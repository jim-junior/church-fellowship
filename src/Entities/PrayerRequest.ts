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
export class PrayerRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  request: string;

  // user 
  @ManyToOne(() => User, user => user.prayerRequests)
  user: User;
}

export const createPrayerRequest = async (
  request: string,
  userid: number
) => {
  const user = await User.findOne({
    where: { id: userid },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const prayerRequest = new PrayerRequest();
  prayerRequest.request = request;
  prayerRequest.user = user;

  await prayerRequest.save();


  return prayerRequest;
};

export const getPrayerRequestById = async (id: number) => {
  const prayerRequest = await PrayerRequest.findOne({
    where: { id },
  });

  return prayerRequest;
};

export const getPrayerRequests = async () => {
  const prayerRequests = await PrayerRequest.find();

  return prayerRequests;
};

export const getPrayerRequestsByUser = async (userid: number) => {
  const user = await User.findOne({
    where: { id: userid },
    relations: ["prayerRequests"],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.prayerRequests;
};