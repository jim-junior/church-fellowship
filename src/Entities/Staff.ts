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

@Entity()
export class Staff extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column({ nullable: true })
  middle_name!: string;

  @Column()
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