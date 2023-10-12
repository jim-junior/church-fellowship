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
} from "typeorm";
import { User } from "./User";


@Entity()
export class Staff extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column({ nullable: true })
  middle_name!: string;

  @Column({ nullable: true})
  last_name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column("simple-array", { nullable: true })
  roles: string[];


  // Add profile columns all are nullable

  @Column({ nullable: true })
  profile_picture!: string;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  phone_number!: string;

  @Column({ nullable: true })
  date_of_birth!: Date;

  @Column({ nullable: true })
  gender!: string;

  @Column({ nullable: true })
  marital_status!: string;

  @Column({ nullable: true })
  nationality!: string;

  @OneToOne(() => User, user => user.staffAccount, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
  })
  userAccount: User;



}


export const createStaff = async (
  first_name: string,
  middle_name: string,
  last_name: string,
  email: string,
  password: string,
) => {
  const staff  = new Staff();
  staff.first_name = first_name;
  staff.middle_name = middle_name;
  staff.last_name = last_name;
  staff.email = email;
  staff.password = password;
  await staff.save();
}

export const getMemberByEmail = async (email: string) => {
  return await Staff.findOne({ where: { email: email } });
}

export const getMemberById = async (id: number) => {
  return await Staff.findOne({ where: { id: id } });
}

export const getUserPassword = async (email: string) => {
  return await Staff.findOne({ where: { email: email }, select: ["password"] });
}

export const getAllStaff = async () => {
  return await Staff.find();
}

export const createUserAccoutForStaff = async (
  staffId: number,
  phone_number: string,
  is_mother: boolean,
  children: number,
) => {
  const staff = await Staff.findOne({
    where: {
      id: staffId
    },
    // select all columns including password
    select: ["id", "first_name", "middle_name", "last_name", "email", "password"]
  });

  if (!staff) {
    throw new Error("Staff not found");
  }

  const user = new User();
  user.phone_number = phone_number;
  user.is_mother = is_mother;
  user.children = children;
  user.staffAccount = staff;
  user.full_name = `${staff.first_name} ${staff.middle_name} ${staff.last_name}`; 
  user.email = staff.email;
  user.password = staff.password;
  await user.save();

  staff.userAccount = user;
  await staff.save();

  return user;
}

export const createStaffAccount = async (
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber: string,
  isMother: boolean,
  children: number,
) => {
  const staff = new Staff();
  staff.first_name = firstName;
  staff.middle_name = middleName;
  staff.last_name = lastName;
  staff.email = email;
  staff.password = password;
  await staff.save();

  const user = new User();
  user.phone_number = phoneNumber;
  user.is_mother = isMother;
  user.children = children;
  user.staffAccount = staff;
  user.full_name = `${staff.first_name} ${staff.middle_name} ${staff.last_name}`;
  user.email = staff.email;
  user.password = staff.password;
  await user.save();

  staff.userAccount = user;
  await staff.save();

  return staff;
}

export const createStaffAccoutForUser = async (
  userId: number,
) => {
  const user = await User.findOne({
    where: {
      id: userId
    },
    // select all columns including password
    select: ["id", "full_name", "email", "password"]
  });

  if (!user) {
    throw new Error("User not found");
  }

  const staff = new Staff();
  staff.first_name = user.full_name;
  staff.email = user.email;
  staff.password = user.password;
  staff.userAccount = user;
  await staff.save();

  user.staffAccount = staff;
  await user.save();
}
