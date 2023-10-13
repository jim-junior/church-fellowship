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
export class Meeting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column({
    nullable: true
  })
  duration: string;

  @Column()
  meeting_link: string;

  @ManyToMany(() => User, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  @JoinTable()
  participants: User[];

}

export const createMeeting = async (
  title: string,
  description: string,
  start_time: Date,
  end_time: Date,
  meeting_link: string
) => {
  const newMeeting = new Meeting();
  newMeeting.title = title;
  newMeeting.description = description;
  newMeeting.start_time = start_time;
  newMeeting.end_time = end_time;
  newMeeting.meeting_link = meeting_link;

  await newMeeting.save();

  return newMeeting;
}

export const getMeetings = async () => {
  const meetings = await Meeting.find({
    relations: ["participants"],
    order: {
      start_time: "DESC"
    }
  });

  return meetings;
}

export const deleteMeeting = async (id: number) => {
  const meeting = await Meeting.findOne({
    where: {
      id
    }
  });

  if (!meeting) {
    return false;
  }

  await meeting.remove();

  return true;
}

export const addParticipant = async (meetingId: number, userId: number) => {
  const user = await User.findOne({
    where: {
      id: userId
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const meeting = await Meeting.findOne({
    where: {
      id: meetingId
    }
  });

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  const participants = meeting.participants;

  meeting.participants = [ 
    ...participants,
    user
  ];
  


  await meeting.save();

  return meeting;
}